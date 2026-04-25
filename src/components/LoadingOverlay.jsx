"use client"

/**
 * LoadingOverlay — full-screen spinner between screen transitions.
 * Controlled by the `visible` prop from useStudy.
 */
export default function LoadingOverlay({ visible }) {
  return (
    <div
      className={`loading-overlay${visible ? "" : " hidden"}`}
      aria-hidden={!visible}
      role="status"
    >
      <span className="sr-only">Loading…</span>
      <div className="spinner" />
    </div>
  )
}
