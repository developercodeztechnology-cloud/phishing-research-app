"use client"
import PageShell from "./PageShell"

export default function LinkedInPage({ onAction, scenario, ...bar }) {
  return (
    <PageShell scenario={scenario} barProps={bar} background="#f3f2ef" fontFamily="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
      <div style={{ background:"#fff", borderBottom:"1px solid #e0e0e0", padding:"0 20px", display:"flex", alignItems:"center", gap:"16px", height:"52px", boxShadow:"0 1px 4px rgba(0,0,0,0.08)" }}>
        <svg viewBox="0 0 24 24" width="32" height="32">
          <path fill="#0077B5" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        <div style={{ display:"flex", gap:"20px", flex:1 }}>
          {["Home","My Network","Jobs","Messaging","Notifications"].map(n => (
            <span key={n} style={{ fontSize:"12px", color:n==="My Network"?"rgba(0,0,0,0.9)":"rgba(0,0,0,0.6)", cursor:"pointer", paddingBottom:"4px", borderBottom:n==="My Network"?"2px solid #000":"none", fontWeight:n==="My Network"?600:400 }}>{n}</span>
          ))}
        </div>
        <div style={{ width:"34px", height:"34px", borderRadius:"50%", background:"#0077b5", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"14px" }}>U</div>
      </div>

      <div style={{ maxWidth:"700px", margin:"24px auto", padding:"0 20px", display:"flex", gap:"16px", flexWrap:"wrap" }}>
        <div style={{ flex:"1 1 420px" }}>
          <div style={{ background:"#fff", borderRadius:"8px", border:"1px solid #e0e0e0", overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,0.06)", marginBottom:"16px" }}>
            <div style={{ padding:"16px 20px", borderBottom:"1px solid #e0e0e0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <h2 style={{ fontSize:"16px", fontWeight:600, color:"#000" }}>Invitations (4)</h2>
              <span style={{ color:"#0077b5", fontSize:"13px", cursor:"pointer", fontWeight:600 }}>Manage all</span>
            </div>

            {/* Main invite */}
            <div style={{ padding:"18px 20px", borderBottom:"1px solid #f0f0f0", background:"#f8fbff" }}>
              <div style={{ display:"flex", gap:"14px", alignItems:"flex-start" }}>
                <div style={{ width:"56px", height:"56px", borderRadius:"50%", background:"linear-gradient(135deg,#0077b5,#00a0dc)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:"18px", flexShrink:0 }}>RS</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontWeight:700, fontSize:"14px", color:"#000", marginBottom:"2px" }}>Rahul Sharma</p>
                  <p style={{ fontSize:"12.5px", color:"#555", marginBottom:"2px" }}>Senior Software Engineer at Infosys</p>
                  <p style={{ fontSize:"12px", color:"#777", marginBottom:"12px" }}>Chennai · 2nd degree · 47 mutual connections</p>
                  <div style={{ display:"flex", gap:"10px" }}>
                    <button style={{ background:"transparent", border:"1px solid #0077b5", color:"#0077b5", borderRadius:"999px", padding:"6px 18px", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>Ignore</button>
                    <button onClick={onAction} style={{ background:"#0077b5", border:"none", color:"#fff", borderRadius:"999px", padding:"6px 18px", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>Accept</button>
                  </div>
                </div>
              </div>
            </div>

            {[
              { initials:"PK", name:"Priya Krishnaswamy", title:"Data Analyst at TCS" },
              { initials:"AJ", name:"Arjun Joshi",        title:"Product Manager at Flipkart" },
              { initials:"SM", name:"Sunita Mehta",       title:"HR Manager at Wipro" },
            ].map((p, i) => (
              <div key={i} style={{ padding:"12px 20px", borderBottom:"1px solid #f0f0f0", display:"flex", gap:"12px", alignItems:"center" }}>
                <div style={{ width:"44px", height:"44px", borderRadius:"50%", background:"#ddd", display:"flex", alignItems:"center", justifyContent:"center", color:"#555", fontWeight:700, fontSize:"14px", flexShrink:0 }}>{p.initials}</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:"13.5px", fontWeight:600, color:"#000" }}>{p.name}</p>
                  <p style={{ fontSize:"12px", color:"#777" }}>{p.title}</p>
                </div>
                <button style={{ background:"transparent", border:"1px solid #0077b5", color:"#0077b5", borderRadius:"999px", padding:"5px 14px", fontSize:"12px", fontWeight:600, cursor:"pointer" }}>Accept</button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex:"0 1 220px" }}>
          <div style={{ background:"#fff", borderRadius:"8px", border:"1px solid #e0e0e0", padding:"16px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize:"14px", fontWeight:600, color:"#000", marginBottom:"12px" }}>People you may know</p>
            {[{ initials:"VN", name:"Vignesh Narayanan", mutual:12 }, { initials:"DK", name:"Divya Krishnan", mutual:8 }].map((p,i) => (
              <div key={i} style={{ display:"flex", gap:"10px", marginBottom:"12px", alignItems:"center" }}>
                <div style={{ width:"40px", height:"40px", borderRadius:"50%", background:"#e8e8e8", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:"13px", color:"#444", flexShrink:0 }}>{p.initials}</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:"13px", fontWeight:600, color:"#000" }}>{p.name}</p>
                  <p style={{ fontSize:"11px", color:"#777" }}>{p.mutual} mutuals</p>
                </div>
              </div>
            ))}
            <button onClick={onAction} style={{ width:"100%", background:"transparent", border:"1px solid #0077b5", color:"#0077b5", borderRadius:"999px", padding:"6px", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>View all</button>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
