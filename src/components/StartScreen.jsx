"use client"

import { useState } from "react"

/**
 * ConsentModal — opens when participant clicks the consent text.
 * Explains exactly what data is collected, the study purpose, and rights.
 */
function ConsentModal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-box"
        onClick={e => e.stopPropagation()} // prevent closing when clicking inside
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-icon">🔬</div>
          <div>
            <h2 id="modal-title" className="modal-title">Participant Consent &amp; Data Notice</h2>
            <p className="modal-sub">IEEE Cybersecurity Behaviour Research Study</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-body">

          {/* Study purpose */}
          <div className="modal-section">
            <div className="modal-section-head">🎯 Purpose of This Study</div>
            <p>
              This is an academic cybersecurity research study conducted for an
              <strong> IEEE conference/journal paper</strong> on human behaviour
              and phishing susceptibility. The goal is to understand how people
              respond to realistic online messages — both legitimate and
              phishing-style — across different demographics and device types.
            </p>
            <p style={{ marginTop:"10px" }}>
              <strong>You are NOT being tested.</strong> There are no right or wrong
              answers. We are studying natural response patterns, not individual performance.
            </p>
          </div>

          {/* What we collect */}
          <div className="modal-section">
            <div className="modal-section-head">📊 Data We Collect From You</div>

            <div className="modal-data-grid">
              <div className="modal-data-card green">
                <div className="modal-data-icon">👤</div>
                <div>
                  <strong>Demographics</strong>
                  <p>Age, gender, education level, occupation, and cybersecurity training history. Used for statistical group analysis.</p>
                </div>
              </div>

              <div className="modal-data-card blue">
                <div className="modal-data-icon">🖱️</div>
                <div>
                  <strong>Behavioural Data</strong>
                  <p>Whether you click or skip each message, and how long it takes you to respond (in seconds).</p>
                </div>
              </div>

              <div className="modal-data-card purple">
                <div className="modal-data-icon">📱</div>
                <div>
                  <strong>Device Context</strong>
                  <p>Device type (mobile/tablet/desktop), operating system, browser, screen size, network type, and language settings.</p>
                </div>
              </div>

              <div className="modal-data-card orange">
                <div className="modal-data-icon">🕐</div>
                <div>
                  <strong>Session Metadata</strong>
                  <p>An anonymous random session ID, study version, and total session duration. No account or login required.</p>
                </div>
              </div>
            </div>
          </div>

          {/* What we do NOT collect */}
          <div className="modal-section">
            <div className="modal-section-head">🚫 What We Do NOT Collect</div>
            <div className="modal-no-collect">
              {[
                "Your name or any personal identifier",
                "Email address or phone number",
                "IP address or GPS location",
                "Any passwords you may type into simulated pages",
                "Browser history or cookies",
                "Financial or personal account information",
              ].map((item, i) => (
                <div key={i} className="modal-no-item">
                  <span className="modal-no-check">✗</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How data is used */}
          <div className="modal-section">
            <div className="modal-section-head">🔒 How Your Data Is Used</div>
            <p>
              All responses are stored anonymously in a secure research database. Data
              will be aggregated across all participants and used only for the purpose
              of publishing academic findings in an IEEE cybersecurity paper. Individual
              responses will never be identified or shared.
            </p>
          </div>

          {/* Rights */}
          <div className="modal-section modal-rights">
            <div className="modal-section-head">⚖️ Your Rights</div>
            <ul className="modal-rights-list">
              <li>Participation is <strong>completely voluntary</strong></li>
              <li>You may <strong>stop at any time</strong> by closing the browser</li>
              <li>You must be <strong>18 years or older</strong> to participate</li>
              <li>No data is linked to your identity — it is <strong>fully anonymous</strong></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="modal-section" style={{ fontSize:"12.5px", color:"var(--t3)", lineHeight:1.6 }}>
            <strong style={{ color:"var(--t2)" }}>Research conducted by:</strong> IEEE Cybersecurity Lab Research Group.
            If you have any questions about this study, contact the principal investigator
            through your institution.
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose} id="btn-consent-understood">
            I Understand — Close
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * StartScreen — collects consent + demographic info before the study begins.
 */
export default function StartScreen({ onStart }) {
  const [form, setForm] = useState({
    age:       "",
    gender:    "",
    education: "",
    occupation:"",
    awareness: "no",
  })
  const [consented,  setConsented]  = useState(false)
  const [showModal,  setShowModal]  = useState(false)

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  const canStart = consented && form.age && form.gender

  return (
    <div className="screen-enter">
      {/* Consent Info Modal */}
      {showModal && <ConsentModal onClose={() => setShowModal(false)} />}

      <div className="card">
        {/* Badge */}
        <div className="badge">
          <span className="badge-dot" />
          IEEE Research Study · Anonymous
        </div>

        <h1 className="title-gradient">Quick Interaction<br />Study</h1>
        <p className="subtitle">
          You will see a series of online messages. Simply respond as you normally
          would — there are no right or wrong answers.
        </p>

        {/* Info cards */}
        <div className="info-grid">
          <div className="info-item">
            <div className="info-icon blue">🕐</div>
            <div className="info-text"><strong>~3 Minutes</strong>10 real-looking scenarios</div>
          </div>
          <div className="info-item">
            <div className="info-icon purple">🔒</div>
            <div className="info-text"><strong>Fully Anonymous</strong>No personal data stored</div>
          </div>
          <div className="info-item">
            <div className="info-icon green">📊</div>
            <div className="info-text"><strong>Academic Use</strong>IEEE Cybersecurity Paper</div>
          </div>
          <div className="info-item">
            <div className="info-icon orange">📱</div>
            <div className="info-text"><strong>Any Device</strong>Mobile &amp; Desktop ready</div>
          </div>
        </div>

        {/* Participant information */}
        <div className="consent-box">
          <p><strong>Participant Information</strong></p>
          <p>This study investigates how individuals respond to different types of online messages. Participation is voluntary and you may stop at any time.</p>
          <p>Demographic data is collected anonymously for statistical analysis only. No names, emails, or IP addresses are stored.</p>
        </div>

        {/* ── DEMOGRAPHICS ────────────────────────────────────── */}
        <div style={{ marginBottom:"24px" }}>
          <p style={{ fontSize:"14px", fontWeight:700, color:"var(--t1)", marginBottom:"16px", letterSpacing:"-0.01em" }}>
            📋 Participant Details
          </p>

          {/* Age + Gender row */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"12px" }}>
            <div>
              <label className="field-label" htmlFor="input-age">Age *</label>
              <input
                id="input-age"
                type="number"
                min="18"
                max="80"
                placeholder="e.g. 22"
                value={form.age}
                onChange={e => set("age", e.target.value)}
                style={{
                  width:"100%", background:"var(--glass)", border:"1px solid var(--border)",
                  borderRadius:"var(--r-sm)", padding:"10px 14px", fontSize:"14px",
                  color:"var(--t1)", fontFamily:"var(--font)", outline:"none", boxSizing:"border-box",
                  transition:"border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
                onBlur={e  => e.target.style.borderColor = "var(--border)"}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="gender-group">Gender *</label>
              <div style={{ display:"flex", flexDirection:"column", gap:"6px" }} id="gender-group">
                {[
                  { value:"male",       label:"Male" },
                  { value:"female",     label:"Female" },
                  { value:"other",      label:"Non-binary / Other" },
                  { value:"prefer_not", label:"Prefer not to say" },
                ].map(({ value, label }) => (
                  <label key={value} className="radio-opt" style={{ padding:"6px 14px", fontSize:"12.5px" }}>
                    <input
                      type="radio"
                      name="gender"
                      value={value}
                      checked={form.gender === value}
                      onChange={() => set("gender", value)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div style={{ marginBottom:"12px" }}>
            <label className="field-label" htmlFor="input-edu">Education Level</label>
            <select
              id="input-edu"
              value={form.education}
              onChange={e => set("education", e.target.value)}
              style={{
                width:"100%", background:"var(--surface2)", border:"1px solid var(--border)",
                borderRadius:"var(--r-sm)", padding:"10px 14px", fontSize:"14px",
                color:"var(--t1)", fontFamily:"var(--font)", outline:"none",
                cursor:"pointer", boxSizing:"border-box",
              }}
            >
              <option value="">Select...</option>
              <option value="high_school">High School / 12th</option>
              <option value="diploma">Diploma / Certificate</option>
              <option value="bachelors">Bachelor&#39;s Degree</option>
              <option value="masters">Master&#39;s Degree</option>
              <option value="phd">PhD / Doctorate</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Occupation */}
          <div>
            <label className="field-label" htmlFor="input-occ">Occupation</label>
            <select
              id="input-occ"
              value={form.occupation}
              onChange={e => set("occupation", e.target.value)}
              style={{
                width:"100%", background:"var(--surface2)", border:"1px solid var(--border)",
                borderRadius:"var(--r-sm)", padding:"10px 14px", fontSize:"14px",
                color:"var(--t1)", fontFamily:"var(--font)", outline:"none",
                cursor:"pointer", boxSizing:"border-box",
              }}
            >
              <option value="">Select...</option>
              <option value="student">Student</option>
              <option value="it_professional">IT / Tech Professional</option>
              <option value="non_it_professional">Non-IT Professional</option>
              <option value="business">Business / Self-employed</option>
              <option value="homemaker">Homemaker</option>
              <option value="retired">Retired</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Cybersecurity awareness */}
        <label className="field-label">Have you received cybersecurity awareness training?</label>
        <div className="radio-group">
          {[
            { value:"yes",    label:"Yes" },
            { value:"no",     label:"No"  },
            { value:"unsure", label:"Unsure" },
          ].map(({ value, label }) => (
            <label className="radio-opt" key={value}>
              <input
                type="radio"
                name="awareness"
                value={value}
                checked={form.awareness === value}
                onChange={() => set("awareness", value)}
              />
              {label}
            </label>
          ))}
        </div>

        {/* ── CONSENT CHECKBOX ─────────────────────────────── */}
        <div className="consent-check-wrap">
          <label className="consent-check" htmlFor="consent-cb">
            <input
              type="checkbox"
              id="consent-cb"
              checked={consented}
              onChange={e => setConsented(e.target.checked)}
            />
            <span>
              I understand this is an academic research study, I voluntarily agree to
              participate, and I confirm I am 18 years of age or older.{" "}
              <button
                type="button"
                className="consent-info-btn"
                onClick={e => { e.preventDefault(); setShowModal(true) }}
                aria-label="View full data collection details"
              >
                What data is collected? →
              </button>
            </span>
          </label>
        </div>

        {!form.age || !form.gender ? (
          <p style={{ fontSize:"12px", color:"var(--t3)", textAlign:"center", marginBottom:"12px" }}>
            * Please fill in required fields (Age and Gender) to begin.
          </p>
        ) : null}

        <button
          className="btn btn-primary"
          id="btn-start-study"
          disabled={!canStart}
          onClick={() => canStart && onStart(form)}
        >
          Begin Study &nbsp;→
        </button>
      </div>
    </div>
  )
}
