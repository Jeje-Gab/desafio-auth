import { useState } from "react";
import api, { setAuthToken } from "../api";

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [err,setErr] = useState("");

  async function onSubmit(e: React.FormEvent){
    e.preventDefault(); setErr("");
    try{
      const { data } = await api.post("/auth/login",{ email, password });
      setAuthToken(data.accessToken);
      window.location.href = "/profile";
    }catch(e:any){
      setErr(e?.response?.data?.message || "Erro ao entrar");
    }
  }

  return (
    <div className="page-center">
      <div className="card">
        <h1 className="h1">Login</h1>
        <p className="sub">Acesse sua conta.</p>

        {err && <div className="alert alert-error mt-3">{err}</div>}

        <form onSubmit={onSubmit} className="form">
          <label className="label" htmlFor="email">E-mail</label>
          <input id="email" className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="voce@exemplo.com" />

          <label className="label" htmlFor="password">Senha</label>
          <input id="password" type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />

          <button type="submit" className="btn btn-primary mt-2 w-full">Entrar</button>
        </form>

        <p className="sub center mt-3">
          Não tem conta? <a href="/signup" style={{color:"var(--secondary)", fontWeight:700}}>Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}
