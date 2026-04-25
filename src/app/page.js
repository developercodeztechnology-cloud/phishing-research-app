"use client"

import { useStudy }         from "@/hooks/useStudy"
import LoadingOverlay       from "@/components/LoadingOverlay"
import StartScreen          from "@/components/StartScreen"
import ScenarioScreen       from "@/components/ScenarioScreen"
import EndScreen            from "@/components/EndScreen"

/**
 * Root page — thin orchestrator.
 * All business logic lives in useStudy; this component only routes between screens.
 */
export default function StudyPage() {
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
