"use client"
import PageShell from "./PageShell"

export default function AmazonPage({ onAction, scenario, ...bar }) {
  return (
    <PageShell scenario={scenario} barProps={bar} background="#eaeded" fontFamily="Arial,sans-serif">
      {/* Header */}
      <div style={{ background:"#131921", padding:"10px 20px", display:"flex", alignItems:"center", gap:"20px", flexWrap:"wrap" }}>
        <div style={{ display:"flex", alignItems:"flex-end", gap:"2px" }}>
          <span style={{ color:"#ff9900", fontWeight:900, fontSize:"22px", fontFamily:"'Amazon Ember',Georgia,serif", letterSpacing:"-1px" }}>amazon</span>
          <span style={{ color:"#ff9900", fontSize:"10px", marginBottom:"4px" }}>{".in"}</span>
        </div>
        <div style={{ flex:1, maxWidth:"600px" }}>
          <div style={{ display:"flex", background:"#fff", borderRadius:"4px", overflow:"hidden" }}>
            <input placeholder="Search Amazon.in" style={{ flex:1, padding:"9px 12px", fontSize:"13.5px", border:"none", outline:"none" }} readOnly />
            <button style={{ background:"#febd69", border:"none", padding:"0 14px", cursor:"pointer", fontSize:"18px" }}>🔍</button>
          </div>
        </div>
        <div style={{ color:"#fff", fontSize:"13px", cursor:"pointer" }}>Returns &amp; Orders</div>
        <div style={{ color:"#fff", fontSize:"13px", cursor:"pointer" }}>🛒 Cart</div>
      </div>
      <div style={{ background:"#232f3e", padding:"8px 20px", display:"flex", gap:"18px", flexWrap:"wrap" }}>
        {["Today's Deals","Customer Service","Registry","Gift Cards","Sell"].map(n => (
          <span key={n} style={{ color:"#fff", fontSize:"13px", cursor:"pointer" }}>{n}</span>
        ))}
      </div>

      <div style={{ maxWidth:"960px", margin:"24px auto", padding:"0 20px" }}>
        {/* Success banner */}
        <div style={{ background:"#fff", border:"1px solid #ddd", borderRadius:"4px", padding:"20px 24px", marginBottom:"16px", boxShadow:"0 1px 4px rgba(0,0,0,0.08)", display:"flex", alignItems:"center", gap:"16px" }}>
          <div style={{ width:"44px", height:"44px", background:"#067D62", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px", flexShrink:0 }}>✓</div>
          <div>
            <h2 style={{ fontSize:"18px", fontWeight:700, color:"#067D62", marginBottom:"4px" }}>Order Placed, Thank You!</h2>
            <p style={{ fontSize:"13px", color:"#555" }}>Confirmation has been sent to your registered email address.</p>
          </div>
        </div>

        <div style={{ display:"flex", gap:"16px", flexWrap:"wrap" }}>
          <div style={{ flex:"1 1 500px", background:"#fff", border:"1px solid #ddd", borderRadius:"4px", padding:"20px 24px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"16px", flexWrap:"wrap", gap:"8px" }}>
              <div><p style={{ fontSize:"12px", color:"#888", textTransform:"uppercase" }}>Order placed</p><p style={{ fontSize:"13px", fontWeight:600, color:"#333" }}>April 25, 2025</p></div>
              <div><p style={{ fontSize:"12px", color:"#888", textTransform:"uppercase" }}>Order #</p><p style={{ fontSize:"13px", fontWeight:600, color:"#c45500", fontFamily:"monospace" }}>402-9182837-3840219</p></div>
            </div>
            <hr style={{ border:"none", borderTop:"1px solid #eee", marginBottom:"16px" }} />
            {[
              { name:"boAt Airdopes 141 Bluetooth Earbuds", price:"₹1,299", eta:"Thu, Apr 27" },
              { name:"Realme Buds Wireless 3 Neckband",     price:"₹1,299", eta:"Thu, Apr 27" },
            ].map((item, i) => (
              <div key={i} style={{ display:"flex", gap:"14px", marginBottom:"16px", paddingBottom:"16px", borderBottom:"1px solid #f0f0f0" }}>
                <div style={{ width:"68px", height:"68px", background:"#f0f0f0", borderRadius:"4px", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"24px" }}>🎧</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:"13.5px", fontWeight:600, color:"#007185", cursor:"pointer", marginBottom:"4px" }}>{item.name}</p>
                  <p style={{ fontSize:"12.5px", color:"#555", marginBottom:"4px" }}>1 item · {item.price}</p>
                  <p style={{ fontSize:"12.5px", color:"#067D62", fontWeight:600 }}>Arriving by {item.eta}</p>
                </div>
              </div>
            ))}
            <button onClick={onAction} style={{ width:"100%", background:"#ffd814", border:"1px solid #c7a600", borderRadius:"8px", padding:"10px", fontWeight:700, fontSize:"14px", cursor:"pointer", color:"#111" }}>Track Package</button>
          </div>
          <div style={{ flex:"0 1 220px" }}>
            <div style={{ background:"#fff", border:"1px solid #ddd", borderRadius:"4px", padding:"16px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize:"13px", fontWeight:700, color:"#333", marginBottom:"10px" }}>Order Summary</p>
              {[["Items","₹2,598"],["Delivery","FREE"],["Total","₹2,598"]].map(([l,v],i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", fontSize:"13px", marginBottom:"6px", color:i===2?"#B12704":"#555", fontWeight:i===2?700:400 }}>
                  <span>{l}</span><span>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
