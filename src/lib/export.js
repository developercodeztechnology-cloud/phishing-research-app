import { STUDY_CONFIG } from "@/data/scenarios"

/**
 * Builds the full export payload from session state.
 * Used for both JSON download and API submission.
 */
export function buildExportPayload({ userId, participant, device, results, sessionStartTime }) {
  return {
    studyInfo: {
      title:      STUDY_CONFIG.title,
      version:    STUDY_CONFIG.version,
      exportedAt: new Date().toISOString(),
    },
    participant: {
      userId,
      phishingAwareness:  participant?.phishingAwareness || "no",
      age:                participant?.age        || "",
      gender:             participant?.gender      || "",
      education:          participant?.education   || "",
      occupation:         participant?.occupation  || "",
      sessionDurationSec: sessionStartTime
        ? parseFloat(((Date.now() - sessionStartTime) / 1000).toFixed(2))
        : null,
      totalScenarios: results.length,
    },
    device,
    summary: buildSummary(results),
    results,
  }
}

export function buildSummary(results) {
  if (!results.length) return {}
  return {
    clicked:           results.filter(r => r.userAction === "clicked").length,
    notClicked:        results.filter(r => r.userAction === "not_clicked").length,
    avgResponseTimeSec:parseFloat(
      (results.reduce((s, r) => s + r.responseTimeSec, 0) / results.length).toFixed(3)
    ),
    phishingClicked:   results.filter(r => r.urlType === "phishing" && r.userAction === "clicked").length,
    legitClicked:      results.filter(r => r.urlType === "legit"    && r.userAction === "clicked").length,
    // decisionCorrectness omitted — derive post-hoc
  }
}

/** Trigger a browser download of the session JSON */
export function triggerJSONDownload(payload, userId) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" })
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = `phishing-study-${userId}-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(a.href)
}

/** Persist session to localStorage as a rolling backup */
export function backupToLocalStorage(payload) {
  try {
    const key = "phishing_study_sessions"
    const existing = JSON.parse(localStorage.getItem(key) || "[]")
    existing.push(payload)
    localStorage.setItem(key, JSON.stringify(existing))
  } catch { /* storage full or restricted */ }
}

export function localBackupCount() {
  try {
    return JSON.parse(localStorage.getItem("phishing_study_sessions") || "[]").length
  } catch { return 0 }
}
