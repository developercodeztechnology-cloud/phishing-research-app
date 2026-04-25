"use client"
import PageShell from "./PageShell"

const BLUE = "#004C8C"

export default function BankPage({ onAction, scenario, ...bar }) {
  const isPhishing = scenario?.type === "phishing"

  return (
    <PageShell scenario={scenario} barProps={bar} background="#f4f6f9" fontFamily="Arial,sans-serif">

      {/* Alert banner for phishing version */}
      {isPhishing && (
        <div style={{ background:"#f8d7da", borderBottom:"2px solid #D9001B", padding:"8px 20px", textAlign:"center", fontSize:"13px", color:"#721c24", fontWeight:600 }}>
          ⚠️ Your account access has been restricted. Please login to verify your identity.
        </div>
      )}

      {/* Header */}
      <div style={{ background:BLUE, padding:"12px 30px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <div style={{ width:"40px", height:"40px", background:"#fff", borderRadius:"4px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:"13px", color:BLUE, lineHeight:1, textAlign:"center" }}>HDFC</div>
          <div>
            <div style={{ color:"#fff", fontWeight:700, fontSize:"17px", letterSpacing:"0.06em" }}>HDFC BANK</div>
            <div style={{ color:"rgba(255,255,255,0.7)", fontSize:"10px", letterSpacing:"0.06em" }}>PERSONAL BANKING</div>
          </div>
        </div>
        <div style={{ color:"rgba(255,255,255,0.8)", fontSize:"12px" }}>24×7 Customer Care: 1800 1600</div>
      </div>

      {/* Nav */}
      <div style={{ background:"#003574", display:"flex", gap:0 }}>
        {["Net Banking","Credit Cards","Loans","Insurance","Investments"].map(item => (
          <div key={item} style={{ padding:"10px 18px", color:"rgba(255,255,255,0.75)", fontSize:"12.5px", cursor:"pointer", borderRight:"1px solid rgba(255,255,255,0.1)" }}>{item}</div>
        ))}
      </div>

      {/* Content */}
      <div style={{ display:"flex", justifyContent:"center", padding:"40px 20px", gap:"30px", flexWrap:"wrap" }}>
        <div style={{ background:"#fff", border:"1px solid #d0d7df", borderRadius:"6px", width:"100%", maxWidth:"380px", overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.1)" }}>
          <div style={{ background:BLUE, padding:"14px 20px", color:"#fff", fontWeight:700, fontSize:"15px", letterSpacing:"0.04em" }}>🔒 NetBanking Login</div>
          <div style={{ padding:"24px" }}>
            <label style={{ display:"block", fontSize:"12px", fontWeight:700, color:"#444", marginBottom:"5px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Customer ID</label>
            <input style={{ width:"100%", border:"1px solid #bcc4cc", borderRadius:"3px", padding:"10px 12px", fontSize:"14px", outline:"none", boxSizing:"border-box", marginBottom:"16px" }} placeholder="Enter Customer ID" />
            <label style={{ display:"block", fontSize:"12px", fontWeight:700, color:"#444", marginBottom:"5px", textTransform:"uppercase", letterSpacing:"0.05em" }}>IPIN (Password)</label>
            <input type="password" style={{ width:"100%", border:"1px solid #bcc4cc", borderRadius:"3px", padding:"10px 12px", fontSize:"14px", outline:"none", boxSizing:"border-box", marginBottom:"8px" }} placeholder="Enter IPIN" />
            <p style={{ fontSize:"11.5px", color:"#888", marginBottom:"16px" }}>🔒 256-bit SSL Encrypted Connection</p>
            <button onClick={onAction} style={{ width:"100%", background:`linear-gradient(135deg,${BLUE},#0066b3)`, color:"#fff", border:"none", borderRadius:"4px", padding:"12px", fontWeight:700, fontSize:"14px", cursor:"pointer", letterSpacing:"0.05em", textTransform:"uppercase" }}>LOGIN</button>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:"14px" }}>
              <span style={{ fontSize:"12px", color:BLUE, cursor:"pointer" }}>Forgot Customer ID?</span>
              <span style={{ fontSize:"12px", color:BLUE, cursor:"pointer" }}>Forgot IPIN?</span>
            </div>
          </div>
        </div>
        <div style={{ maxWidth:"260px" }}>
          <div style={{ background:"#fff1cc", border:"1px solid #f0d080", borderRadius:"6px", padding:"14px 16px", marginBottom:"16px" }}>
            <p style={{ fontSize:"12.5px", fontWeight:700, color:"#7a5c00", marginBottom:"6px" }}>⚠️ Security Notice</p>
            <p style={{ fontSize:"12px", color:"#555", lineHeight:1.6 }}>HDFC Bank will never ask for your complete password, CVV, or OTP over email or SMS.</p>
          </div>
        </div>
      </div>

      <div style={{ background:"#002f5f", color:"rgba(255,255,255,0.5)", padding:"14px 30px", fontSize:"11px", textAlign:"center" }}>
        © 2025 HDFC Bank Ltd. All Rights Reserved. | Member of DICGC
      </div>
    </PageShell>
  )
}
