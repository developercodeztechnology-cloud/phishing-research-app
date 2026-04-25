"use client"
import ResearchBar         from "./ResearchBar"
import SimulatedAddressBar from "./SimulatedAddressBar"

/**
 * PageShell — shared wrapper for every simulated website page.
 *
 * Renders:
 *   1. ResearchBar   (42px) — study progress + countdown
 *   2. SimulatedAddressBar (42px) — fake browser URL bar (phishing vs legit)
 *   3. Page content  (fills rest of viewport, scrollable)
 *
 * Props:
 *   scenario   — current scenario object (needs scenario.fakeUrl + scenario.type)
 *   barProps   — spread props for ResearchBar (currentIndex, totalScenarios, secondsLeft, isUrgent)
 *   background — CSS background value for the page (default "#fff")
 *   fontFamily — font stack for the page
 *   children   — the actual website UI
 */
export default function PageShell({
  scenario,
  barProps,
  background  = "#fff",
  fontFamily  = "Arial, sans-serif",
  children,
}) {
  return (
    <>
      <ResearchBar {...barProps} />

      <SimulatedAddressBar
        url={scenario?.fakeUrl || "https://example.com"}
        isPhishing={scenario?.type === "phishing"}
      />

      <div style={{
        position:   "fixed",
        inset:      0,
        paddingTop: "84px",   // 42px research bar + 42px address bar
        background,
        fontFamily,
        overflowY:  "auto",
        boxSizing:  "border-box",
      }}>
        {children}
      </div>
    </>
  )
}
