"use client"

/**
 * SimulatedAddressBar — renders a Chrome-style browser address bar.
 *
 * Phishing pages → suspicious domain highlighted in red + ⚠️ warning
 * Legit pages    → green padlock + trusted domain
 *
 * This is a KEY research element: participants can see (or miss) the
 * suspicious domain, which is the primary real-world phishing indicator.
 */
export default function SimulatedAddressBar({ url = "", isPhishing = false }) {
  let displayDomain = ""
  let displayPath   = ""

  try {
    const parsed  = new URL(url)
    displayDomain = parsed.hostname
    displayPath   = parsed.pathname + parsed.search
  } catch {
    displayDomain = url
  }

  return (
    <div style={{
      position:     "fixed",
      top:          "42px",
      left:         0, right: 0,
      height:       "42px",
      background:   "#dee1e6",
      borderBottom: "1px solid #c4c7cc",
      display:      "flex",
      alignItems:   "center",
      padding:      "0 10px",
      gap:          "5px",
      zIndex:       9998,
      fontFamily:   "Arial, sans-serif",
      boxSizing:    "border-box",
    }}>

      {/* Nav buttons — decorative */}
      {[["←", false], ["→", true], ["↻", false]].map(([icon, disabled], i) => (
        <button key={i} style={{
          width: "26px", height: "26px",
          background: "none", border: "none",
          color: disabled ? "#bbb" : "#555",
          fontSize: "15px", cursor: "default",
          display: "flex", alignItems: "center", justifyContent: "center",
          borderRadius: "50%", flexShrink: 0,
        }}>{icon}</button>
      ))}

      {/* ── URL bar ───────────────────────────────────────────── */}
      <div style={{
        flex:         1,
        height:       "28px",
        background:   "#fff",
        border:       isPhishing ? "2px solid #dc2626" : "1.5px solid #bbb",
        borderRadius: "14px",
        display:      "flex",
        alignItems:   "center",
        padding:      "0 10px",
        gap:          "4px",
        overflow:     "hidden",
        boxShadow:    isPhishing ? "0 0 0 3px rgba(220,38,38,0.12)" : "none",
        transition:   "box-shadow 0.3s ease",
      }}>

        {/* Security icon */}
        {isPhishing ? (
          <span style={{ fontSize:"13px", flexShrink:0 }} title="Not secure — suspicious domain">
            ⚠️
          </span>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#1a7f37" style={{ flexShrink:0 }}>
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
        )}

        {/* https:// */}
        <span style={{ color:"#888", fontSize:"12px", flexShrink:0 }}>https://</span>

        {/* Domain — red + highlighted for phishing, normal for legit */}
        <span style={{
          color:          isPhishing ? "#dc2626" : "#111",
          fontWeight:     isPhishing ? 700 : 600,
          fontSize:       "12.5px",
          background:     isPhishing ? "rgba(220,38,38,0.09)" : "transparent",
          padding:        isPhishing ? "1px 4px" : "0",
          borderRadius:   "3px",
          flexShrink:     0,
          letterSpacing:  "-0.01em",
        }}>
          {displayDomain}
        </span>

        {/* Path — greyed */}
        <span style={{
          color:        "#888",
          fontSize:     "12px",
          overflow:     "hidden",
          textOverflow: "ellipsis",
          whiteSpace:   "nowrap",
        }}>
          {displayPath}
        </span>
      </div>

      {/* Right icons — decorative */}
      <div style={{ display:"flex", gap:"2px", flexShrink:0 }}>
        {["☆", "⋮"].map((icon, i) => (
          <button key={i} style={{
            width:"26px", height:"26px", background:"none", border:"none",
            color:"#555", fontSize:"14px", cursor:"default",
            display:"flex", alignItems:"center", justifyContent:"center",
            borderRadius:"50%",
          }}>{icon}</button>
        ))}
      </div>
    </div>
  )
}
