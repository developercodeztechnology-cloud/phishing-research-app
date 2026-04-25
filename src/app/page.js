"use client"

import { useEffect, useRef } from "react"
import { useStudy }         from "@/hooks/useStudy"
import LoadingOverlay       from "@/components/LoadingOverlay"
import StartScreen          from "@/components/StartScreen"
import ScenarioScreen       from "@/components/ScenarioScreen"
import EndScreen            from "@/components/EndScreen"

/**
 * requestFullscreen on the first user gesture.
 * Browsers require a user gesture (click/touch) before going fullscreen.
 */
function useFullscreenOnGesture() {
  const done = useRef(false)
  useEffect(() => {
    function go() {
      if (done.current) return
      done.current = true
      const el = document.documentElement
      const req =
        el.requestFullscreen ||
        el.webkitRequestFullscreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullscreen
      if (req) req.call(el).catch(() => {}) // silently ignore if denied
    }
    window.addEventListener("pointerdown", go, { once: true })
    window.addEventListener("touchstart",  go, { once: true })
    return () => {
      window.removeEventListener("pointerdown", go)
      window.removeEventListener("touchstart",  go)
    }
  }, [])
}

/**
 * Root page — thin orchestrator.
 * All business logic lives in useStudy; this component only routes between screens.
 */
export default function StudyPage() {
  useFullscreenOnGesture()

  const {
    screen,
    loading,
    // Scenario screen
    currentScenario,
    currentIndex,
    totalScenarios,
    progressPercent,
    secondsLeft,
    isUrgent,
    // End screen
    snapResults,
    device,
    participant,
    userId,
    submitStatus,
    // Actions
    startStudy,
    handleAction,
    downloadJSON,
    restartStudy,
  } = useStudy()

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
