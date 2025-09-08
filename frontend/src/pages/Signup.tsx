import { useState } from "react";
import api from "../api";

export default function Signup() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirm] = useState("");
  const [err,setErr] = useState("");
  const [ok,setOk] = useState("");

  async function onSubmit(e: React.FormEvent){
    e.preventDefault(); setErr(""); setOk("");
    try{
      await api.post("/auth/signup",{ email, password, confirmPassword });
      setOk("Conta criada! Você já pode fazer login.");
      setEmail(""); setPassword(""); setConfirm("");
    }catch(e:any){
      setErr(e?.response?.data?.message || "Erro ao cadastrar");
    }
  }

  return (
    <div className="page-center">
      <div className="card">
        <h1 className="h1">Criar conta</h1>
        <p className="sub">Bem-vindo! Preencha os campos abaixo.</p>

        {ok && <div className="alert alert-success mt-3">{ok}</div>}
        {err && <div className="alert alert-error mt-3">{err}</div>}

        <form onSubmit={onSubmit} className="form">
          <label className="label" htmlFor="email">E-mail</label>
          <input id="email" className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="voce@exemplo.com" />

          <label className="label" htmlFor="password">Senha</label>
          <input id="password" type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />

          <label className="label" htmlFor="confirm">Confirmar senha</label>
          <input id="confirm" type="password" className="input" value={confirmPassword} onChange={e=>setConfirm(e.target.value)} placeholder="••••••••" />

          <button type="submit" className="btn btn-secondary mt-2 w-full">Criar conta</button>
        </form>

        <p className="sub center mt-3">
          Já tem conta? <a href="/login" style={{color:"var(--primary)", fontWeight:700}}>Faça login</a>
        </p>
      </div>
    </div>
  );
}
