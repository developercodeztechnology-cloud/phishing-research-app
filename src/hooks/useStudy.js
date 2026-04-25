"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { SCENARIOS, STUDY_CONFIG } from "@/data/scenarios"
import { getDeviceInfo } from "@/lib/device"
import { buildExportPayload, triggerJSONDownload, backupToLocalStorage, localBackupCount } from "@/lib/export"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * shuffleInterleaved — used for the scenario list.
 *
 * Independently shuffles the phishing and legit groups, then
 * builds a merged sequence where no more than 2 consecutive
 * scenarios share the same type.
 *
 * Example output types: phishing, legit, phishing, phishing,
 *   legit, phishing, legit, legit, phishing, legit
 */
function shuffleInterleaved(scenarios) {
  const phishing = shuffle(scenarios.filter(s => s.type === "phishing"))
  const legit    = shuffle(scenarios.filter(s => s.type === "legit"))
  const result   = []
  let pi = 0, li = 0

  while (pi < phishing.length || li < legit.length) {
    const lastType  = result.length > 0 ? result[result.length - 1].type : null
    const last2Same = result.length >= 2 &&
                      result[result.length - 2].type === lastType &&
                      result[result.length - 1].type === lastType

    let pickPhishing
    if      (last2Same && lastType === "phishing" && li < legit.length)   pickPhishing = false
    else if (last2Same && lastType === "legit"    && pi < phishing.length) pickPhishing = true
    else if (pi >= phishing.length) pickPhishing = false
    else if (li >= legit.length)    pickPhishing = true
    else                            pickPhishing = Math.random() > 0.5

    if (pickPhishing) result.push(phishing[pi++])
    else              result.push(legit[li++])
  }

  return result
}

function generateUID() {
  return (
    "USR-" +
    Date.now().toString(36).toUpperCase() +
    "-" +
    Math.random().toString(36).slice(2, 6).toUpperCase()
  )
}

// NOTE: decisionCorrectness is intentionally NOT stored.
// It can be derived post-hoc: phishing+not_clicked = correct, legit+clicked = correct.

// ─── useStudy Hook ────────────────────────────────────────────────────────────

/**
 * Central state machine for the phishing behaviour study.
 *
 * Screens: "start" → "scenario" → "end"
 *
 * All mutable values shared across closures live in `stateRef.current`
 * to avoid stale-closure bugs with setInterval.
 */
export function useStudy() {
  // ── React state (drives re-renders) ──
  const [screen,       setScreen]       = useState("start")
  const [loading,      setLoading]      = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [secondsLeft,  setSecondsLeft]  = useState(STUDY_CONFIG.autoAdvanceSec)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [snapResults,  setSnapResults]  = useState([]) // snapshot for render

  // ── Ref (shared across timer callbacks without causing re-renders) ──
  const r = useRef({
    scenarios:         [],
    results:           [],
    currentIndex:      0,
    scenarioStartTime: null,
    sessionStartTime:  null,
    userId:            null,
    device:            null,
    participant:       null,
    countdownTimer:    null,
  })

  // ── Cleanup ──────────────────────────────────────────────────────────
  const clearCountdown = useCallback(() => {
    if (r.current.countdownTimer) {
      clearInterval(r.current.countdownTimer)
      r.current.countdownTimer = null
    }
  }, [])

  useEffect(() => () => clearCountdown(), [clearCountdown])

  // ── Build a single result record ─────────────────────────────────────
  const buildResult = useCallback((action, responseMs, idx) => {
    const sc = r.current.scenarios[idx]
    const responseTimeSec = parseFloat((responseMs / 1000).toFixed(3))
    return {
      userId:           r.current.userId,
      studyVersion:     STUDY_CONFIG.version,
      sessionTimestamp: new Date().toISOString(),
      attemptNumber:    idx + 1,
      scenarioId:       sc.id,
      urlType:          sc.type,          // "phishing" | "legit"
      theme:            sc.theme,
      userAction:       action === "click" ? "clicked" : "not_clicked",
      responseTimeSec,
      // decisionCorrectness intentionally omitted — derive from urlType+userAction post-hoc
      // Participant demographics (flat for SPSS/CSV export)
      phishingAwareness: r.current.participant?.phishingAwareness || "no",
      participantAge:    r.current.participant?.age        || "",
      participantGender: r.current.participant?.gender     || "",
      education:         r.current.participant?.education  || "",
      occupation:        r.current.participant?.occupation || "",
      // Device context (flat)
      ...r.current.device,
    }
  }, [])

  // ── Data submission ──────────────────────────────────────────────────
  const submitData = useCallback(async () => {
    const payload = buildExportPayload({
      userId:           r.current.userId,
      participant:      r.current.participant,
      device:           r.current.device,
      results:          r.current.results,
      sessionStartTime: r.current.sessionStartTime,
    })

    // Always backup locally first
    backupToLocalStorage(payload)

    try {
      setSubmitStatus({ type: "pending", title: "Submitting to research server…", desc: "Sending your anonymous session data securely." })

      const res  = await fetch("/api/submit", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      })
      const data = await res.json()

      if (data.ok) {
        setSubmitStatus({
          type:  "success",
          title: "☁️ Successfully submitted",
          desc:  `Session ${r.current.userId} recorded in the research database. Local backups: ${localBackupCount()}`,
        })
      } else {
        setSubmitStatus({
          type:  "local",
          title: "💾 Saved locally",
          desc:  `Cloud sync: ${data.message || "Webhook not configured"}. All data is safe in browser localStorage (${localBackupCount()} sessions).`,
        })
      }
    } catch {
      setSubmitStatus({
        type:  "local",
        title: "💾 Saved locally (network error)",
        desc:  `Data is safely backed up in your browser. Total sessions stored: ${localBackupCount()}.`,
      })
    }
  }, [])

  // ── Advance to end screen ─────────────────────────────────────────────
  const goToEnd = useCallback(() => {
    setLoading(true)
    setTimeout(async () => {
      setLoading(false)
      setSnapResults([...r.current.results])
      setScreen("end")
      await submitData()
    }, 500)
  }, [submitData])

  // ── Start countdown for a given index ────────────────────────────────
  const startCountdown = useCallback(
    (idx) => {
      clearCountdown()
      const sc  = r.current.scenarios[idx]
      let sec   = sc?.timerSec ?? STUDY_CONFIG.autoAdvanceSec
      setSecondsLeft(sec)

      r.current.countdownTimer = setInterval(() => {
        sec--
        setSecondsLeft(sec)

        if (sec <= 0) {
          clearCountdown()
          const ms     = Date.now() - r.current.scenarioStartTime
          const result = buildResult("no_click", ms, idx)
          r.current.results.push(result)
          proceed(idx + 1)
        }
      }, 1000)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clearCountdown, buildResult]
  )

  // ── Move to next scenario or end screen ──────────────────────────────
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const proceed = useCallback(
    (nextIdx) => {
      if (nextIdx >= r.current.scenarios.length) {
        goToEnd()
        return
      }
      r.current.currentIndex = nextIdx
      setCurrentIndex(nextIdx)
      setSecondsLeft(STUDY_CONFIG.autoAdvanceSec)
      setLoading(true)

      setTimeout(() => {
        setLoading(false)
        r.current.currentIndex     = nextIdx
        setCurrentIndex(nextIdx)
        const sc  = r.current.scenarios[nextIdx]
        setSecondsLeft(sc?.timerSec ?? STUDY_CONFIG.autoAdvanceSec)
        r.current.scenarioStartTime = Date.now()
        startCountdown(nextIdx)
      }, 350)
    },
    [goToEnd, startCountdown]
  )

  // ── Public API ────────────────────────────────────────────────────────

  /** Called when user clicks "Begin Study" on the start screen.
   *  `participantForm` is the full object from StartScreen:
   *  { age, gender, education, occupation, awareness }
   */
  const startStudy = useCallback(
    (participantForm) => {
      r.current.userId      = generateUID()
      r.current.device      = getDeviceInfo()
      r.current.participant = {
        phishingAwareness: participantForm.awareness || "no",
        age:               participantForm.age        || "",
        gender:            participantForm.gender      || "",
        education:         participantForm.education   || "",
        occupation:        participantForm.occupation  || "",
      }
      r.current.scenarios        = shuffleInterleaved(SCENARIOS)
      r.current.results          = []
      r.current.currentIndex     = 0
      r.current.sessionStartTime = Date.now()

      setCurrentIndex(0)
      setSnapResults([])
      setLoading(true)

      setTimeout(() => {
        setLoading(false)
        setScreen("scenario")
        const firstSc = r.current.scenarios[0]
        setSecondsLeft(firstSc?.timerSec ?? STUDY_CONFIG.autoAdvanceSec)
        r.current.scenarioStartTime = Date.now()
        startCountdown(0)
      }, 600)
    },
    [startCountdown]
  )

  /** Called when user clicks the scenario action button */
  const handleAction = useCallback(() => {
    clearCountdown()
    const ms     = Date.now() - r.current.scenarioStartTime
    const result = buildResult("click", ms, r.current.currentIndex)
    r.current.results.push(result)
    proceed(r.current.currentIndex + 1)
  }, [clearCountdown, buildResult, proceed])

  /** Download full session JSON */
  const downloadJSON = useCallback(() => {
    const payload = buildExportPayload({
      userId:           r.current.userId,
      participant:      r.current.participant,
      device:           r.current.device,
      results:          r.current.results,
      sessionStartTime: r.current.sessionStartTime,
    })
    triggerJSONDownload(payload, r.current.userId)
  }, [])

  /** Reset everything and go back to start */
  const restartStudy = useCallback(() => {
    clearCountdown()
    r.current = {
      scenarios: [], results: [], currentIndex: 0,
      scenarioStartTime: null, sessionStartTime: null,
      userId: null, device: null, participant: null, countdownTimer: null,
    }
    setCurrentIndex(0)
    setSecondsLeft(STUDY_CONFIG.autoAdvanceSec)
    setSubmitStatus(null)
    setSnapResults([])
    setLoading(false)
    setScreen("start")
  }, [clearCountdown])

  // ── Derived values for consuming components ───────────────────────────
  const currentScenario = r.current.scenarios[currentIndex] || null
  const totalScenarios  = r.current.scenarios.length || STUDY_CONFIG.totalScenarios
  const progressPercent = totalScenarios ? ((currentIndex) / totalScenarios) * 100 : 0
  const isUrgent        = secondsLeft <= 3

  return {
    // State
    screen,
    loading,
    secondsLeft,
    isUrgent,
    currentIndex,
    currentScenario,
    totalScenarios,
    progressPercent,
    snapResults,
    submitStatus,
    device:      r.current.device,
    participant: r.current.participant,
    userId:      r.current.userId,
    // Actions
    startStudy,
    handleAction,
    downloadJSON,
    restartStudy,
  }
}
