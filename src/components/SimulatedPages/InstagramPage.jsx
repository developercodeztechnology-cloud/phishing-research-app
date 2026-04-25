"use client"
import PageShell from "./PageShell"

const S = {
  card: { width:"100%", maxWidth:"350px", border:"1px solid #dbdbdb", borderRadius:"3px", padding:"30px 40px 20px", background:"#fff", marginBottom:"10px" },
  cardBottom: { width:"100%", maxWidth:"350px", border:"1px solid #dbdbdb", borderRadius:"3px", padding:"16px", background:"#fff", textAlign:"center" },
  input: { width:"100%", background:"#fafafa", border:"1px solid #dbdbdb", borderRadius:"3px", padding:"10px 9px", fontSize:"13.5px", marginBottom:"6px", outline:"none", boxSizing:"border-box", color:"#262626" },
  btn: { width:"100%", background:"#0095f6", color:"#fff", border:"none", borderRadius:"6px", padding:"8px 0", fontWeight:700, fontSize:"14px", cursor:"pointer", marginTop:"6px" },
  or: { display:"flex", alignItems:"center", gap:"12px", margin:"16px 0", color:"#8e8e8e", fontSize:"13px", fontWeight:600 },
  orLine: { flex:1, height:"1px", background:"#dbdbdb" },
  fbBtn: { width:"100%", background:"transparent", border:"none", color:"#385185", fontWeight:700, fontSize:"14px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"6px 0" },
}

export default function InstagramPage({ onAction, scenario, ...bar }) {
  return (
    <PageShell scenario={scenario} barProps={bar} background="#fff" fontFamily="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
      <div style={{ minHeight:"calc(100vh - 84px)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"20px" }}>

        {/* Card */}
        <div style={S.card}>
          <div style={{ textAlign:"center", marginBottom:"20px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="45" height="45">
              <defs>
                <radialGradient id="ig1" cx="30%" cy="107%" r="150%">
                  <stop offset="0%" stopColor="#fdf497"/>
                  <stop offset="5%" stopColor="#fdf497"/>
                  <stop offset="45%" stopColor="#fd5949"/>
                  <stop offset="60%" stopColor="#d6249f"/>
                  <stop offset="90%" stopColor="#285AEB"/>
                </radialGradient>
              </defs>
              <path fill="url(#ig1)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
            <div style={{ fontFamily:"'Dancing Script','Billabong',cursive,serif", fontSize:"34px", letterSpacing:"-0.5px", color:"#262626", lineHeight:1.1, marginTop:"4px" }}>Instagram</div>
          </div>

          <input style={S.input} type="text"     placeholder="Phone number, username, or email" />
          <input style={S.input} type="password" placeholder="Password" />
          <button style={S.btn} onClick={onAction}>Log In</button>

          <div style={S.or}><span style={S.orLine}/><span>OR</span><span style={S.orLine}/></div>
          <button style={S.fbBtn}>
            <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#385185" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Log in with Facebook
          </button>
          <p style={{ fontSize:"12px", color:"#00376b", marginTop:"12px", textAlign:"center", cursor:"pointer" }}>Forgot password?</p>
        </div>

        <div style={S.cardBottom}>
          <p style={{ fontSize:"14px", color:"#262626" }}>Don&#39;t have an account? <span style={{ color:"#0095f6", fontWeight:700, cursor:"pointer" }}>Sign up</span></p>
        </div>
        <p style={{ fontSize:"13px", color:"#8e8e8e", textAlign:"center", marginTop:"20px" }}>Get the app.</p>
        <div style={{ display:"flex", gap:"8px", marginTop:"12px" }}>
          {["App Store","Google Play"].map(s => (
            <div key={s} style={{ border:"1px solid #dbdbdb", borderRadius:"6px", padding:"8px 14px", fontSize:"12px", color:"#262626", display:"flex", alignItems:"center", gap:"6px" }}>📱 {s}</div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
