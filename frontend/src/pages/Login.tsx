import { useState } from 'react';
import api, { setAuthToken } from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setAuthToken(data.accessToken);
      window.location.href = '/profile';
    } catch (e: any) {
      setErr(e?.response?.data?.message || 'Erro ao entrar');
    }
  }

  return (
    <div style={{display:'grid',minHeight:'100dvh',placeItems:'center',padding:'16px'}}>
      <form onSubmit={onSubmit} style={{width:'100%',maxWidth:420,display:'grid',gap:12}}>
        <h1>Login</h1>
        {err && <div style={{color:'#c00'}}>❌ {err}</div>}
        <input placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
        <a href="/signup">Criar conta</a>
      </form>
    </div>
  );
}
