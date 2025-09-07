import { useState } from 'react';
import api from '../api';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(''); setOk('');
    try {
      await api.post('/auth/signup', { email, password, confirmPassword });
      setOk('Conta criada! Você já pode fazer login.');
    } catch (e: any) {
      setErr(e?.response?.data?.message || 'Erro ao cadastrar');
    }
  }

  return (
    <div style={{display:'grid',minHeight:'100dvh',placeItems:'center',padding:'16px'}}>
      <form onSubmit={onSubmit} style={{width:'100%',maxWidth:420,display:'grid',gap:12}}>
        <h1>Cadastro</h1>
        {ok && <div style={{color:'#0a7'}}>✅ {ok}</div>}
        {err && <div style={{color:'#c00'}}>❌ {err}</div>}
        <input placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <input placeholder="Confirmar senha" type="password" value={confirmPassword} onChange={e=>setConfirm(e.target.value)} />
        <button type="submit">Criar conta</button>
        <a href="/login">Já tenho conta</a>
      </form>
    </div>
  );
}
