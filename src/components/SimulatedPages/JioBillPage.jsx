"use client"
import PageShell from "./PageShell"

export default function JioBillPage({ onAction, scenario, ...bar }) {
  return (
    <PageShell scenario={scenario} barProps={bar} background="#f0f4f8" fontFamily="'Roboto',Arial,sans-serif">
      <div style={{ background:"linear-gradient(135deg,#0b2eff,#0066ff)", padding:"14px 20px", display:"flex", alignItems:"center", gap:"16px", boxShadow:"0 2px 10px rgba(0,0,0,0.15)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <div style={{ background:"#fff", borderRadius:"50%", width:"36px", height:"36px", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"#0066ff", fontWeight:900, fontSize:"13px" }}>JIO</span>
          </div>
          <span style={{ color:"#fff", fontWeight:800, fontSize:"22px" }}>Jio</span>
        </div>
        <div style={{ flex:1 }}/>
        {["Home","My Jio","Plans","JioCinema"].map(n => (
          <span key={n} style={{ color:"rgba(255,255,255,0.8)", fontSize:"13px", cursor:"pointer" }}>{n}</span>
        ))}
      </div>

      <div style={{ maxWidth:"700px", margin:"28px auto", padding:"0 20px" }}>
        <p style={{ fontSize:"12px", color:"#888", marginBottom:"16px" }}>Home &gt; My Account &gt; <strong style={{ color:"#0066ff" }}>Bill Details</strong></p>

        <div style={{ background:"#fff", borderRadius:"12px", padding:"24px", marginBottom:"16px", boxShadow:"0 2px 12px rgba(0,0,0,0.08)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"20px", flexWrap:"wrap", gap:"12px" }}>
            <div><p style={{ fontSize:"13px", color:"#888", marginBottom:"4px" }}>Bill Period</p><p style={{ fontSize:"17px", fontWeight:700, color:"#1a1a1a" }}>March 2025</p></div>
            <div style={{ textAlign:"right" }}><p style={{ fontSize:"13px", color:"#888", marginBottom:"4px" }}>Bill Amount</p><p style={{ fontSize:"28px", fontWeight:800, color:"#0066ff" }}>₹499</p></div>
          </div>

          <div style={{ background:"#e8f0fe", borderRadius:"8px", padding:"12px 16px", marginBottom:"20px", display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ fontSize:"18px" }}>✅</span>
            <p style={{ fontSize:"13px", color:"#1a73e8", fontWeight:600 }}>Auto-pay active. ₹499 will be auto-debited on April 15, 2025.</p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"20px" }}>
            {[["Mobile Number","9876XXXXX4"],["Plan","Jio Postpaid Plus"],["Billing Cycle","25th of every month"],["Account Status","Active ✅"]].map(([k,v]) => (
              <div key={k} style={{ background:"#f8f9fa", borderRadius:"8px", padding:"12px 14px" }}>
                <p style={{ fontSize:"11px", color:"#888", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"4px" }}>{k}</p>
                <p style={{ fontSize:"13.5px", fontWeight:600, color:"#1a1a1a" }}>{v}</p>
              </div>
            ))}
          </div>

          {/* Usage bar */}
          <div style={{ marginBottom:"20px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
              <p style={{ fontSize:"13px", fontWeight:600, color:"#333" }}>Data Usage</p>
              <p style={{ fontSize:"13px", color:"#666" }}>38.4 GB / 75 GB</p>
            </div>
            <div style={{ background:"#e0e0e0", borderRadius:"999px", height:"10px", overflow:"hidden" }}>
              <div style={{ width:"51%", height:"100%", background:"linear-gradient(90deg,#0066ff,#00c6ff)", borderRadius:"999px" }}/>
            </div>
            <p style={{ fontSize:"11.5px", color:"#888", marginTop:"5px" }}>36.6 GB remaining</p>
          </div>

          {/* Breakdown */}
          <div style={{ borderTop:"1px solid #eee", paddingTop:"16px" }}>
            <p style={{ fontWeight:700, fontSize:"13.5px", color:"#333", marginBottom:"12px" }}>Bill Breakdown</p>
            {[
              ["Postpaid Plan (75GB + Unlimited Calls)", "₹399"],
              ["Jio TV + JioCinema OTT Bundle",          "₹79"],
              ["Taxes & Levies",                         "₹21"],
            ].map(([l,v]) => (
              <div key={l} style={{ display:"flex", justifyContent:"space-between", fontSize:"13px", marginBottom:"8px", color:"#555" }}>
                <span>{l}</span><span style={{ fontWeight:600 }}>{v}</span>
              </div>
            ))}
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:"14px", fontWeight:700, paddingTop:"10px", borderTop:"1px dashed #ddd", color:"#1a1a1a" }}>
              <span>Total</span><span style={{ color:"#0066ff" }}>₹499</span>
            </div>
          </div>
        </div>

        <div style={{ display:"flex", gap:"12px" }}>
          <button onClick={onAction} style={{ flex:1, background:"linear-gradient(135deg,#0b2eff,#0066ff)", color:"#fff", border:"none", borderRadius:"10px", padding:"14px", fontWeight:700, fontSize:"14px", cursor:"pointer", boxShadow:"0 4px 16px rgba(0,102,255,0.3)" }}>
            📄 Download PDF Bill
          </button>
          <button style={{ flex:1, background:"#fff", color:"#0066ff", border:"2px solid #0066ff", borderRadius:"10px", padding:"14px", fontWeight:700, fontSize:"14px", cursor:"pointer" }}>
            💳 Pay Now
          </button>
        </div>
      </div>
    </PageShell>
  )
}
