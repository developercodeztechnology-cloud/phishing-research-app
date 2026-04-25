"use client"

/**
 * EndScreen — displays results summary, device info, per-scenario data table,
 * submission status, and download/restart actions.
 *
 * Props:
 *   results       — array of result records
 *   device        — device info object from getDeviceInfo()
 *   participant   — { phishingAwareness }
 *   userId        — anonymous participant ID
 *   submitStatus  — { type, title, desc } | null
 *   onDownload()  — triggers JSON download
 *   onRestart()   — resets study to start screen
 */
export default function EndScreen({
  results,
  device,
  participant,
  userId,
  submitStatus,
  onDownload,
  onRestart,
}) {
  // ── Summary stats ────────────────────────────────────────────────────
  const total      = results.length
  const clicks     = results.filter(r => r.userAction === "clicked").length
  const avgTime    = total
    ? (results.reduce((s, r) => s + r.responseTimeSec, 0) / total).toFixed(2)
    : "—"
  const phishClicks = results.filter(r => r.urlType === "phishing" && r.userAction === "clicked").length
  const phishTotal  = results.filter(r => r.urlType === "phishing").length

  // ── Submit status banner ─────────────────────────────────────────────
  const statusIcons = { pending:"🔄", success:"☁️", local:"💾", error:"⚠️" }

  // ── Device display rows ──────────────────────────────────────────────
  const deviceRows = device
    ? [
        ["Category",    device.deviceCategory],
        ["OS",          device.os],
        ["Browser",     `${device.browser} ${device.browserVersion}`],
        ["Screen",      device.screenResolution],
        ["Viewport",    device.viewportSize],
        ["Pixel Ratio", device.devicePixelRatio + "×"],
        ["Touch Pts",   device.touchPoints],
        ["Language",    device.language],
        ["Timezone",    device.timezone],
        ["CPU Cores",   device.cpuCores],
        ["RAM",         device.ramGB],
        ["Network",     device.networkType],
      ]
    : []

  return (
    <div className="screen-enter">
      <div className="card">

        {/* Hero */}
        <div className="end-icon" aria-hidden="true">✅</div>
        <h2 className="end-title">Thank You!</h2>
        <p className="end-sub">
          Your responses have been recorded and will contribute to our IEEE
          cybersecurity behaviour research paper. Session ID:&nbsp;
          <code style={{ fontSize:"11px", color:"var(--t3)" }}>{userId}</code>
        </p>

        {/* Submit status banner */}
        {submitStatus && (
          <div className={`submit-banner ${submitStatus.type}`} role="status">
            <span className="submit-icon">{statusIcons[submitStatus.type] || "ℹ️"}</span>
            <div>
              <div className="submit-title">{submitStatus.title}</div>
              <div className="submit-desc">{submitStatus.desc}</div>
            </div>
          </div>
        )}

        {/* Stats grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{clicks}</div>
            <div className="stat-label">Links Clicked</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{avgTime}s</div>
            <div className="stat-label">Avg Response</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{phishClicks}/{phishTotal}</div>
            <div className="stat-label">Phishing Clicked</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{device?.deviceCategory || "—"}</div>
            <div className="stat-label">Device</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{participant?.phishingAwareness || "—"}</div>
            <div className="stat-label">Awareness</div>
          </div>
        </div>

        {/* Device context panel */}
        {device && (
          <div className="panel">
            <div className="panel-header">🖥 Detected Device Context</div>
            <div className="device-grid">
              {deviceRows.map(([key, val]) => (
                <div className="device-cell" key={key}>
                  <div className="device-key">{key}</div>
                  <div className="device-val">{String(val)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Per-scenario results table */}
        <div className="panel">
          <div className="panel-header">📋 Session Data — Per Scenario</div>
          <div className="table-wrap">
            <table className="results">
              <thead>
                <tr>
                  <th>#</th><th>Type</th><th>Theme</th><th>Action</th><th>Time</th>
                </tr>
              </thead>
              <tbody>
                {results.map(r => (
                  <tr key={r.scenarioId + r.attemptNumber}>
                    <td>{r.attemptNumber}</td>
                    <td><span className={`pill ${r.urlType}`}>{r.urlType}</span></td>
                    <td>{r.theme}</td>
                    <td>
                      <span className={`pill ${r.userAction === "clicked" ? "clicked" : "not_clicked"}`}>
                        {r.userAction}
                      </span>
                    </td>
                    <td>{r.responseTimeSec}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <button className="btn btn-download" id="btn-download-json" onClick={onDownload}>
          ⬇ Download Full Data (JSON)
        </button>
        <button className="btn btn-ghost" id="btn-restart" onClick={onRestart}>
          ↩ Restart Study
        </button>
      </div>
    </div>
  )
}
