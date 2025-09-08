import { useEffect, useState } from "react";
import api, { setAuthToken } from "../api";

type Me = { id:number; email:string; created_at:string };

export default function Profile(){
  const [me,setMe] = useState<Me|null>(null);
  const [err,setErr] = useState("");

  useEffect(()=>{
    const t = localStorage.getItem("accessToken");
    if (t) setAuthToken(t);
    api.get<Me>("/auth/me")
      .then(r=>setMe(r.data))
      .catch(e=>setErr(e?.response?.data?.message || "Erro ao buscar perfil"));
  },[]);

  function logout(){ localStorage.removeItem("accessToken"); window.location.href="/login"; }

  return (
    <div className="page">
      <div className="container">
        <div className="card" style={{maxWidth:720}}>
          <h1 className="h1">Perfil</h1>

          {err && <div className="alert alert-error mt-3">{err}</div>}

          {me ? (
            <div className="mt-3" style={{display:"grid", gap:"8px"}}>
              <div><span className="sub">ID:</span> <strong>{me.id}</strong></div>
              <div><span className="sub">E-mail:</span> <strong>{me.email}</strong></div>
              <div><span className="sub">Criado em:</span> <strong>{new Date(me.created_at).toLocaleString()}</strong></div>
            </div>
          ) : !err ? <p className="sub mt-3">Carregando...</p> : null}

          <div style={{display:"flex", gap:"12px", marginTop:"16px"}}>
            <button className="btn btn-ghost">Editar (futuro)</button>
            <button onClick={logout} className="btn btn-primary">Sair</button>
          </div>
        </div>
      </div>
    </div>
  );
}
