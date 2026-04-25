"use client"

import { useEffect, useState } from "react"
import { PAGE_MAP } from "@/components/SimulatedPages"

/**
 * ScenarioScreen
 *
 * If scenario.pageType exists and maps to a component in PAGE_MAP,
 * renders the full-screen simulated website page.
 *
 * Otherwise falls back to the original card-based message view.
 */
export default function ScenarioScreen({
  scenario,
  currentIndex,
  totalScenarios,
  progressPercent,
  secondsLeft,
  isUrgent,
  onAction,
}) {
  const [actionRecorded, setActionRecorded] = useState(false)

  useEffect(() => {
    setActionRecorded(false)
  }, [scenario?.id])

  if (!scenario) return null

  // ── Resolve simulated page component ─────────────────────────────────
  const PageComponent = scenario.pageType ? PAGE_MAP[scenario.pageType] : null

  if (PageComponent) {
    return (
      <PageComponent
        scenario={scenario}
        currentIndex={currentIndex}
        totalScenarios={totalScenarios}
        secondsLeft={secondsLeft}
        isUrgent={isUrgent}
        onAction={() => {
          if (actionRecorded) return
          setActionRecorded(true)
          onAction()
        }}
      />
    )
  }

  // ── Fallback: card-based view ─────────────────────────────────────────
  const avatarBg = {
    bank:     "rgba(59,130,246,0.18)",
    social:   "rgba(236,72,153,0.18)",
    delivery: "rgba(16,185,129,0.18)",
    email:    "rgba(139,92,246,0.18)",
    reward:   "rgba(245,158,11,0.18)",
  }[scenario.theme] || "rgba(99,102,241,0.18)"

  return (
    <div className="screen-enter">
      <div className="card">
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"20px", flexWrap:"wrap", gap:"10px" }}>
          <span style={{ fontSize:"12px", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--t3)" }}>
            Scenario {currentIndex + 1} / {totalScenarios}
          </span>
          <div className={`timer${isUrgent ? " urgent" : ""}`} aria-live="polite">
            ⏱ <span>{secondsLeft}</span>s
          </div>
        </div>

        <div className="progress-wrap">
          <div className="progress-fill" style={{ width:`${progressPercent}%` }} />
        </div>

        <div className="sender-row">
          <div className="sender-avatar" style={{ background: avatarBg }}>
            {scenario.senderEmoji}
          </div>
          <div className="sender-info">
            <div className="sender-name">{scenario.sender}</div>
            <div className="sender-sub">{scenario.senderSub}</div>
          </div>
          <div className="sender-time">{scenario.time}</div>
        </div>

        <div className={`msg-bubble ${scenario.theme}`}>
          <p className="msg-text">{scenario.text}</p>
        </div>

        <hr className="divider" />

        <button
          className={`btn btn-action ${scenario.theme}`}
          onClick={() => {
            if (actionRecorded) return
            setActionRecorded(true)
            onAction()
          }}
          disabled={actionRecorded}
        >
          {actionRecorded ? "✓ Recorded" : scenario.actionLabel}
        </button>

        <p className="skip-hint">Auto-advances if no action is taken within {secondsLeft} seconds</p>
      </div>
    </div>
  )
}
