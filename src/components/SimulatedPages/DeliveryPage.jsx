"use client"
import PageShell from "./PageShell"

export default function DeliveryPage({ onAction, scenario, ...bar }) {
  return (
    <PageShell scenario={scenario} barProps={bar} background="#f5f5f5" fontFamily="'Helvetica Neue',Arial,sans-serif">
      {/* FedEx header */}
      <div style={{ background:"#4d148c" }}>
        <div style={{ background:"#ff6200", padding:"12px 24px", display:"flex", alignItems:"center", gap:"6px" }}>
          <span style={{ color:"#4d148c", fontWeight:900, fontSize:"22px", fontStyle:"italic", letterSpacing:"-1px" }}>Fed</span>
          <span style={{ color:"#fff", fontWeight:900, fontSize:"22px", fontStyle:"italic", letterSpacing:"-1px" }}>Ex</span>
          <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.8)", marginLeft:"6px", marginTop:"8px" }}>Express</span>
          <div style={{ flex:1 }}/>
          <span style={{ color:"rgba(255,255,255,0.8)", fontSize:"12px" }}>Track | Ship | Manage</span>
        </div>
        <div style={{ background:"#4d148c", padding:"8px 24px", display:"flex", gap:"20px" }}>
          {["Tracking","Shipping","Locations","Support"].map(n => (
            <span key={n} style={{ color:"rgba(255,255,255,0.7)", fontSize:"13px", cursor:"pointer" }}>{n}</span>
          ))}
        </div>
      </div>

      {/* Alert */}
      <div style={{ background:"#fff3cd", border:"1px solid #ffc107", borderLeft:"4px solid #ff6200", padding:"14px 24px", display:"flex", alignItems:"center", gap:"12px" }}>
        <span style={{ fontSize:"20px" }}>⚠️</span>
        <div>
          <p style={{ fontWeight:700, fontSize:"14px", color:"#333", marginBottom:"2px" }}>Delivery Attempt Failed</p>
          <p style={{ fontSize:"13px", color:"#555" }}>We were unable to deliver your package. Immediate action required.</p>
        </div>
      </div>

      <div style={{ maxWidth:"700px", margin:"30px auto", padding:"0 20px" }}>
        {/* Tracking card */}
        <div style={{ background:"#fff", border:"1px solid #ddd", borderRadius:"6px", padding:"24px", marginBottom:"20px", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px", flexWrap:"wrap", gap:"10px" }}>
            <div>
              <p style={{ fontSize:"12px", color:"#888", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"4px" }}>Tracking Number</p>
              <p style={{ fontSize:"16px", fontWeight:700, color:"#333", fontFamily:"monospace" }}>7489 2610 4837 IN</p>
            </div>
            <div style={{ background:"#fff3cd", border:"1px solid #ffc107", borderRadius:"20px", padding:"6px 14px", fontSize:"12px", fontWeight:700, color:"#b45309" }}>● DELIVERY FAILED</div>
          </div>
          {[
            { status:"Package Picked Up",     date:"Apr 23", done:true,  warn:false },
            { status:"In Transit — Delhi Hub", date:"Apr 24", done:true,  warn:false },
            { status:"Out for Delivery",       date:"Apr 25", done:true,  warn:false },
            { status:"Delivery Attempted",     date:"Apr 25", done:true,  warn:true  },
            { status:"Awaiting Rescheduling",  date:"Today",  done:false, warn:false },
          ].map((item, i) => (
            <div key={i} style={{ display:"flex", gap:"14px", marginBottom:"14px", alignItems:"flex-start" }}>
              <div style={{ width:"14px", height:"14px", borderRadius:"50%", background:item.warn?"#ff6200":item.done?"#4d148c":"#ddd", marginTop:"3px", flexShrink:0 }}/>
              <div>
                <p style={{ fontSize:"13.5px", fontWeight:item.warn?700:400, color:item.warn?"#ff6200":item.done?"#333":"#aaa" }}>{item.status}</p>
                <p style={{ fontSize:"11.5px", color:"#999" }}>{item.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Fee notice */}
        <div style={{ background:"#fff", border:"1px solid #f0807a", borderRadius:"6px", padding:"20px 24px", marginBottom:"20px", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
          <p style={{ fontWeight:700, fontSize:"14px", color:"#c0392b", marginBottom:"8px" }}>⚠️ Customs Clearance Fee Required</p>
          <p style={{ fontSize:"13px", color:"#555", lineHeight:1.6, marginBottom:"16px" }}>A customs clearance fee of <strong>₹49</strong> is due before your package can be redelivered. Failure to pay within 24 hours will result in the package being returned.</p>
          <div style={{ background:"#f9f9f9", border:"1px solid #eee", borderRadius:"4px", padding:"12px 16px", marginBottom:"16px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
              <span style={{ fontSize:"13px", color:"#555" }}>Customs Duty Fee</span>
              <span style={{ fontSize:"13px", fontWeight:600 }}>₹49.00</span>
            </div>
            <div style={{ borderTop:"1px dashed #ddd", paddingTop:"6px", display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:"13px", fontWeight:700 }}>Total Due</span>
              <span style={{ fontSize:"13px", fontWeight:700, color:"#ff6200" }}>₹49.00</span>
            </div>
          </div>
          <button onClick={onAction} style={{ width:"100%", background:"#ff6200", color:"#fff", border:"none", borderRadius:"4px", padding:"13px", fontWeight:700, fontSize:"14px", cursor:"pointer", letterSpacing:"0.04em" }}>
            PAY ₹49 &amp; RESCHEDULE DELIVERY
          </button>
        </div>
      </div>
      <div style={{ background:"#333", color:"#aaa", padding:"16px 24px", fontSize:"11.5px", textAlign:"center" }}>© 2025 FedEx. All rights reserved.</div>
    </PageShell>
  )
}
