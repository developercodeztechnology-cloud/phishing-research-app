"use client"
import PageShell from "./PageShell"

export default function SwiggyPage({ onAction, scenario, ...bar }) {
  return (
    <PageShell scenario={scenario} barProps={bar} background="#f7f7f7" fontFamily="'Roboto',Arial,sans-serif">
      <div style={{ background:"#fff", borderBottom:"1px solid #eee", padding:"12px 20px", display:"flex", alignItems:"center", gap:"14px", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ width:"32px", height:"32px", background:"#fc8019", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ color:"#fff", fontWeight:900, fontSize:"14px" }}>S</span>
        </div>
        <span style={{ color:"#fc8019", fontWeight:800, fontSize:"20px", letterSpacing:"-0.5px" }}>Swiggy</span>
      </div>

      <div style={{ background:"linear-gradient(135deg,#fc8019,#fb6c15)", padding:"16px 20px", textAlign:"center" }}>
        <p style={{ color:"#fff", fontSize:"11px", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"4px", fontWeight:600 }}>🟢 LIVE TRACKING</p>
        <p style={{ color:"#fff", fontSize:"18px", fontWeight:800 }}>Your order is on the way!</p>
        <p style={{ color:"rgba(255,255,255,0.85)", fontSize:"13px", marginTop:"4px" }}>Estimated arrival: <strong>8 minutes</strong></p>
      </div>

      <div style={{ maxWidth:"680px", margin:"20px auto", padding:"0 20px", boxSizing:"border-box" }}>
        {/* Map simulation */}
        <div style={{ background:"#e8f5e9", border:"2px solid #a5d6a7", borderRadius:"12px", height:"180px", marginBottom:"16px", position:"relative", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
          {Array.from({length:6}).map((_,i) => <div key={"v"+i} style={{ position:"absolute", left:`${i*20}%`, top:0, bottom:0, width:"1px", background:"rgba(0,0,0,0.06)" }}/>)}
          {Array.from({length:4}).map((_,i) => <div key={"h"+i} style={{ position:"absolute", top:`${i*33}%`, left:0, right:0, height:"1px", background:"rgba(0,0,0,0.06)" }}/>)}
          <div style={{ position:"absolute", top:"50%", left:0, right:0, height:"3px", background:"rgba(255,255,255,0.7)" }}/>
          <div style={{ position:"absolute", left:"35%", top:0, bottom:0, width:"3px", background:"rgba(255,255,255,0.7)" }}/>
          <div style={{ position:"absolute", left:"40%", top:"35%", transform:"translate(-50%,-50%)" }}>
            <div style={{ width:"36px", height:"36px", background:"#fc8019", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", boxShadow:"0 4px 12px rgba(252,128,25,0.5)", border:"3px solid #fff" }}>🛵</div>
          </div>
          <div style={{ position:"absolute", right:"20%", bottom:"25%", transform:"translate(50%,50%)", fontSize:"24px" }}>📍</div>
          <p style={{ color:"#666", fontSize:"12px", fontStyle:"italic", position:"absolute", bottom:"8px", left:"50%", transform:"translateX(-50%)", whiteSpace:"nowrap" }}>Live map tracking</p>
        </div>

        {/* Delivery partner */}
        <div style={{ background:"#fff", borderRadius:"12px", padding:"16px 20px", marginBottom:"16px", boxShadow:"0 2px 12px rgba(0,0,0,0.08)", display:"flex", alignItems:"center", gap:"16px" }}>
          <div style={{ width:"52px", height:"52px", borderRadius:"50%", background:"#fc8019", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px", flexShrink:0 }}>👨</div>
          <div style={{ flex:1 }}>
            <p style={{ fontWeight:700, fontSize:"15px", color:"#282c3f", marginBottom:"2px" }}>Rajesh Kumar</p>
            <p style={{ fontSize:"13px", color:"#93959f" }}>Your delivery partner · ⭐ 4.8</p>
          </div>
          <div style={{ display:"flex", gap:"10px" }}>
            <div style={{ width:"40px", height:"40px", borderRadius:"50%", border:"2px solid #fc8019", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:"18px" }}>📞</div>
          </div>
        </div>

        {/* Order card */}
        <div style={{ background:"#fff", borderRadius:"12px", padding:"16px 20px", marginBottom:"16px", boxShadow:"0 2px 12px rgba(0,0,0,0.08)" }}>
          <div style={{ display:"flex", gap:"14px", marginBottom:"12px" }}>
            <div style={{ width:"50px", height:"50px", background:"#f0f0f0", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px", flexShrink:0 }}>🍔</div>
            <div>
              <p style={{ fontWeight:700, fontSize:"14px", color:"#282c3f" }}>Burger King</p>
              <p style={{ fontSize:"12.5px", color:"#93959f" }}>Whopper Meal × 1 · ₹349</p>
              <p style={{ fontSize:"12.5px", color:"#93959f" }}>Crispy Veg Burger × 1 · ₹179</p>
            </div>
          </div>
          <hr style={{ border:"none", borderTop:"1px dashed #eee", margin:"10px 0" }} />
          <div style={{ display:"flex", justifyContent:"space-between" }}>
            <span style={{ fontSize:"13px", color:"#555" }}>Total Paid</span>
            <span style={{ fontSize:"13px", fontWeight:700, color:"#282c3f" }}>₹548 (COD)</span>
          </div>
        </div>

        <button onClick={onAction} style={{ width:"100%", background:"#fc8019", color:"#fff", border:"none", borderRadius:"10px", padding:"15px", fontWeight:800, fontSize:"15px", cursor:"pointer", boxShadow:"0 4px 16px rgba(252,128,25,0.4)" }}>
          📍 Open Live Map
        </button>
      </div>
    </PageShell>
  )
}
