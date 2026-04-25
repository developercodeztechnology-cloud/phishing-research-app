"use client"
import { useState, useEffect } from "react"
import PageShell from "./PageShell"

export default function RewardPage({ onAction, scenario, ...bar }) {
  const [timeLeft, setTimeLeft] = useState(299)
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(p => Math.max(0, p - 1)), 1000)
    return () => clearInterval(t)
  }, [])
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0")
  const secs = String(timeLeft % 60).padStart(2, "0")

  return (
    <PageShell scenario={scenario} barProps={bar} background="linear-gradient(160deg,#5f259f,#3d1a6e)" fontFamily="'Roboto',Arial,sans-serif">
      <div style={{ minHeight:"calc(100vh - 84px)", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"14px 20px", display:"flex", alignItems:"center", gap:"12px", background:"rgba(0,0,0,0.15)" }}>
          <div style={{ width:"36px", height:"36px", background:"#fff", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontWeight:900, fontSize:"13px", color:"#5f259f" }}>Ph</span>
          </div>
          <div>
            <div style={{ color:"#fff", fontWeight:700, fontSize:"16px" }}>PhonePe</div>
            <div style={{ color:"rgba(255,255,255,0.65)", fontSize:"11px" }}>Secure · Fast · Reliable</div>
          </div>
        </div>

        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"20px" }}>
          <div style={{ fontSize:"52px", marginBottom:"10px" }}>🎉</div>
          <h2 style={{ color:"#fff", fontSize:"24px", fontWeight:800, textAlign:"center", marginBottom:"6px" }}>Congratulations!</h2>
          <p style={{ color:"rgba(255,255,255,0.75)", fontSize:"14px", textAlign:"center", marginBottom:"28px" }}>You&#39;ve been selected for an exclusive cashback offer</p>

          <div style={{ background:"rgba(255,255,255,0.1)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:"16px", padding:"28px 40px", textAlign:"center", marginBottom:"20px", width:"100%", maxWidth:"340px", boxSizing:"border-box" }}>
            <p style={{ color:"rgba(255,255,255,0.7)", fontSize:"13px", marginBottom:"6px", textTransform:"uppercase", letterSpacing:"0.08em" }}>Cashback Amount</p>
            <div style={{ color:"#fff", fontSize:"52px", fontWeight:900, letterSpacing:"-2px", lineHeight:1 }}>₹2,500</div>
            <p style={{ color:"rgba(255,255,255,0.6)", fontSize:"12px", marginTop:"8px" }}>Direct to your linked bank account</p>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"28px" }}>
            <div style={{ background:"rgba(255,255,255,0.15)", borderRadius:"8px", padding:"10px 16px", textAlign:"center" }}>
              <div style={{ color:"#fff", fontSize:"22px", fontWeight:800, fontVariantNumeric:"tabular-nums" }}>{mins}</div>
              <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"10px", textTransform:"uppercase", letterSpacing:"0.06em" }}>Min</div>
            </div>
            <div style={{ color:"#fff", fontSize:"24px", fontWeight:300 }}>:</div>
            <div style={{ background:"rgba(255,255,255,0.15)", borderRadius:"8px", padding:"10px 16px", textAlign:"center" }}>
              <div style={{ color:"#fff", fontSize:"22px", fontWeight:800, fontVariantNumeric:"tabular-nums" }}>{secs}</div>
              <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"10px", textTransform:"uppercase", letterSpacing:"0.06em" }}>Sec</div>
            </div>
          </div>

          <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:"10px", padding:"12px 20px", marginBottom:"24px", width:"100%", maxWidth:"340px", boxSizing:"border-box", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ color:"rgba(255,255,255,0.6)", fontSize:"12px" }}>Eligible UPI ID</span>
            <span style={{ color:"#fff", fontSize:"13px", fontWeight:600 }}>9876XXXXX4@okicici</span>
          </div>

          <button onClick={onAction} style={{ width:"100%", maxWidth:"340px", background:"linear-gradient(135deg,#00d09c,#00a67c)", color:"#fff", border:"none", borderRadius:"12px", padding:"16px", fontWeight:800, fontSize:"16px", cursor:"pointer", boxShadow:"0 8px 30px rgba(0,0,0,0.3)", boxSizing:"border-box" }}>
            Claim ₹2,500 Now →
          </button>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:"11px", marginTop:"12px", textAlign:"center" }}>By claiming, you agree to PhonePe&#39;s T&amp;C</p>
        </div>
      </div>
    </PageShell>
  )
}
