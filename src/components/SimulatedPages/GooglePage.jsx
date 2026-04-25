"use client"
import { useState } from "react"
import PageShell from "./PageShell"

const GLETTERS = ["G","o","o","g","l","e"]
const GCLR     = ["#4285F4","#EA4335","#FBBC05","#4285F4","#34A853","#EA4335"]

export default function GooglePage({ onAction, scenario, ...bar }) {
  const [step, setStep] = useState(1)

  return (
    <PageShell scenario={scenario} barProps={bar} background="#fff" fontFamily="'Google Sans',Roboto,Arial,sans-serif">
      <div style={{ minHeight:"calc(100vh - 84px)", display:"flex", flexDirection:"column" }}>
        <div style={{ display:"flex", justifyContent:"flex-end", padding:"12px 24px", alignItems:"center", gap:"16px" }}>
          <a style={{ fontSize:"13px", color:"#1a73e8", textDecoration:"none", cursor:"pointer" }}>About</a>
          <a style={{ fontSize:"13px", color:"#1a73e8", textDecoration:"none", cursor:"pointer" }}>Store</a>
          <button style={{ background:"#1a73e8", color:"#fff", border:"none", borderRadius:"4px", padding:"8px 18px", fontSize:"13.5px", fontWeight:500, cursor:"pointer" }}>Sign in</button>
        </div>

        <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
          <div style={{ width:"100%", maxWidth:"450px" }}>
            <div style={{ border:"1px solid #dadce0", borderRadius:"8px", padding:"48px 40px 36px", boxSizing:"border-box" }}>
              <div style={{ textAlign:"center", marginBottom:"20px" }}>
                <div style={{ display:"flex", justifyContent:"center" }}>
                  {GLETTERS.map((l,i) => (
                    <span key={i} style={{ fontSize:"28px", fontWeight:500, color:GCLR[i], fontFamily:"'Product Sans',Arial,sans-serif" }}>{l}</span>
                  ))}
                </div>
              </div>
              <h1 style={{ fontSize:"24px", fontWeight:400, color:"#202124", textAlign:"center", marginBottom:"8px" }}>Sign in</h1>
              <p style={{ fontSize:"14px", color:"#202124", textAlign:"center", marginBottom:"28px" }}>to continue to Gmail</p>

              {step === 1 ? (
                <>
                  <div style={{ position:"relative", marginBottom:"22px" }}>
                    <input type="email" id="google-email" placeholder=" " style={{ width:"100%", border:"1px solid #dadce0", borderRadius:"4px", padding:"13px 15px 7px", fontSize:"16px", outline:"none", boxSizing:"border-box", background:"#fff" }} />
                    <label htmlFor="google-email" style={{ position:"absolute", left:"15px", top:"10px", fontSize:"12px", color:"#5f6368", background:"#fff", padding:"0 2px" }}>Email or phone</label>
                  </div>
                  <p style={{ fontSize:"13px", color:"#1a73e8", marginBottom:"30px", cursor:"pointer" }}>Forgot email?</p>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <button style={{ background:"none", border:"none", color:"#1a73e8", fontSize:"14px", fontWeight:600, cursor:"pointer", padding:"10px 0" }}>Create account</button>
                    <button onClick={() => setStep(2)} style={{ background:"#1a73e8", color:"#fff", border:"none", borderRadius:"4px", padding:"10px 24px", fontSize:"14px", fontWeight:500, cursor:"pointer" }}>Next</button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"24px", background:"#f1f3f4", borderRadius:"999px", padding:"6px 12px 6px 6px", width:"fit-content" }}>
                    <div style={{ width:"30px", height:"30px", borderRadius:"50%", background:"#1a73e8", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:"14px", fontWeight:700 }}>U</div>
                    <span style={{ fontSize:"13px", color:"#202124" }}>user@gmail.com</span>
                  </div>
                  <div style={{ position:"relative", marginBottom:"8px" }}>
                    <input type="password" id="google-pwd" style={{ width:"100%", border:"1px solid #dadce0", borderRadius:"4px", padding:"13px 15px 7px", fontSize:"16px", outline:"none", boxSizing:"border-box", background:"#fff" }} />
                    <label htmlFor="google-pwd" style={{ position:"absolute", left:"15px", top:"10px", fontSize:"12px", color:"#5f6368", background:"#fff", padding:"0 2px" }}>Enter your password</label>
                  </div>
                  <p style={{ fontSize:"13px", color:"#1a73e8", marginBottom:"28px", cursor:"pointer" }}>Forgot password?</p>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <button onClick={() => setStep(1)} style={{ background:"none", border:"none", color:"#1a73e8", fontSize:"14px", fontWeight:600, cursor:"pointer" }}>← Back</button>
                    <button onClick={onAction} style={{ background:"#1a73e8", color:"#fff", border:"none", borderRadius:"4px", padding:"10px 24px", fontSize:"14px", fontWeight:500, cursor:"pointer" }}>Next</button>
                  </div>
                </>
              )}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", padding:"16px 10px 0", flexWrap:"wrap", gap:"6px" }}>
              {["English (United States)","Help","Privacy","Terms"].map(l => (
                <a key={l} style={{ fontSize:"12px", color:"#5f6368", cursor:"pointer", textDecoration:"none" }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
