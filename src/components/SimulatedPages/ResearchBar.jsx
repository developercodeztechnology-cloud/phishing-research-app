"use client"

/**
 * ResearchBar — fixed top bar shown during all simulated page scenarios.
 * Provides unobtrusive progress + timer without breaking the page illusion.
 */
export default function ResearchBar({ currentIndex, totalScenarios, secondsLeft, isUrgent }) {
  const timerColor = isUrgent ? "#f87171" : "#fbbf24"
  const timerBg    = isUrgent ? "rgba(239,68,68,0.18)"  : "rgba(245,158,11,0.12)"
  const timerBdr   = isUrgent ? "rgba(239,68,68,0.4)"   : "rgba(245,158,11,0.35)"

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      height: "42px",
      background: "rgba(10,12,22,0.94)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      zIndex: 99999,
      fontFamily: "'Inter', system-ui, sans-serif",
      boxSizing: "border-box",
    }}>
      <span style={{ fontSize:"10.5px", fontWeight:700, color:"#4a5580", letterSpacing:"0.1em", textTransform:"uppercase" }}>
        Research Study
      </span>

      <span style={{ fontSize:"12px", fontWeight:600, color:"#64748b" }}>
        Scenario {currentIndex + 1} / {totalScenarios}
      </span>

      <div style={{
        background: timerBg,
        border: `1px solid ${timerBdr}`,
        borderRadius: "999px",
        padding: "4px 12px",
        fontSize: "12px",
        fontWeight: 700,
        color: timerColor,
        fontVariantNumeric: "tabular-nums",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        animation: isUrgent ? "urgentPulse 0.6s ease-in-out infinite alternate" : "none",
      }}>
        ⏱ {secondsLeft}s
      </div>

      <style>{`
        @keyframes urgentPulse {
          from { box-shadow: 0 0 0 0 rgba(239,68,68,0.3); }
          to   { box-shadow: 0 0 0 6px rgba(239,68,68,0); }
        }
      `}</style>
    </div>
  )
}
