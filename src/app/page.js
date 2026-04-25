"use client"

import { useEffect, useRef, useState } from "react"
import { useStudy }         from "@/hooks/useStudy"
import LoadingOverlay       from "@/components/LoadingOverlay"
import StartScreen          from "@/components/StartScreen"
import ScenarioScreen       from "@/components/ScenarioScreen"
import EndScreen            from "@/components/EndScreen"

/* ─── Fullscreen prompt overlay ─────────────────────────────────────────── */
function FullscreenPrompt({ onEnter }) {
  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(13,15,26,0.97)",
      backdropFilter: "blur(16px)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      zIndex: 99999, gap: "24px",
      cursor: "pointer", userSelect: "none",
    }} onClick={onEnter} onTouchStart={onEnter}>
      <div style={{
        fontSize: "clamp(48px, 12vw, 80px)",
        animation: "fsPulse 1.6s ease-in-out infinite",
      }}>⛶</div>
      <div style={{
        fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 800,
        color: "#f0f2ff", letterSpacing: "-0.02em", textAlign: "center",
        padding: "0 24px",
      }}>Tap to Enter Full Screen</div>
      <div style={{
        fontSize: "14px", color: "#64748b", textAlign: "center",
        padding: "0 32px", lineHeight: 1.6,
      }}>For the best study experience, the app will open in fullscreen mode.</div>
      <div style={{
        marginTop: "8px",
        background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
        color: "#fff", padding: "14px 40px",
        borderRadius: "14px", fontWeight: 700, fontSize: "16px",
        boxShadow: "0 8px 30px rgba(99,102,241,0.4)",
      }}>Continue →</div>
      <style>{`
        @keyframes fsPulse {
          0%,100% { transform: scale(1);   opacity: 1;    }
          50%      { transform: scale(1.12); opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}

/* ─── Hook: track fullscreen state ──────────────────────────────────────── */
function useFullscreen() {
  const [ready, setReady] = useState(false)

  function enterFullscreen() {
    const el = document.documentElement
    const req =
      el.requestFullscreen ||
      el.webkitRequestFullscreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen
    if (req) {
      req.call(el).catch(() => {})
    }
    setReady(true)   // always show the app, even if fullscreen is denied
  }

  useEffect(() => {
    // If already in fullscreen (e.g. PWA / standalone), skip the prompt
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      window.navigator.standalone
    ) {
      setReady(true)
    }
  }, [])

  return { ready, enterFullscreen }
}

/**
 * Root page — thin orchestrator.
 * All business logic lives in useStudy; this component only routes between screens.
 */
export default function StudyPage() {
  const { ready, enterFullscreen } = useFullscreen()

  const {
    screen,
    loading,
    currentScenario,
    currentIndex,
    totalScenarios,
    progressPercent,
    secondsLeft,
    isUrgent,
    snapResults,
    device,
    participant,
    userId,
    submitStatus,
    startStudy,
    handleAction,
    downloadJSON,
    restartStudy,
  } = useStudy()

  // Show fullscreen prompt until user taps
  if (!ready) return <FullscreenPrompt onEnter={enterFullscreen} />

  return (
    <main className="app">
      <LoadingOverlay visible={loading} />

      {screen === "start" && (
        <StartScreen onStart={startStudy} />
      )}

      {screen === "scenario" && (
        <ScenarioScreen
          scenario={currentScenario}
          currentIndex={currentIndex}
          totalScenarios={totalScenarios}
          progressPercent={progressPercent}
          secondsLeft={secondsLeft}
          isUrgent={isUrgent}
          onAction={handleAction}
        />
      )}

      {screen === "end" && (
        <EndScreen
          results={snapResults}
          device={device}
          participant={participant}
          userId={userId}
          submitStatus={submitStatus}
          onDownload={downloadJSON}
          onRestart={restartStudy}
        />
      )}
    </main>
  )
}
