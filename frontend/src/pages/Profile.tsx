import { useEffect, useState } from 'react';
import api, { setAuthToken } from '../api';

type Me = { id: number; email: string; created_at: string };

export default function Profile() {
  const [me, setMe] = useState<Me | null>(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    // garante header Authorization após reload
    const token = localStorage.getItem('accessToken');
    if (token) setAuthToken(token);

    api.get<Me>('/auth/me')
      .then(r => setMe(r.data))
      .catch(e => setErr(e?.response?.data?.message || 'Erro ao buscar perfil'));
  }, []);

  function logout() {
    setAuthToken(undefined);
    window.location.href = '/login';
  }

  return (
    <div style={{maxWidth:800,margin:'40px auto',padding:'0 16px'}}>
      <h1>Perfil</h1>
      {err && <div style={{color:'#c00'}}>❌ {err}</div>}
      {me ? (
        <pre style={{background:'#f5f5f5',padding:12,borderRadius:6}}>
{JSON.stringify(me, null, 2)}
        </pre>
      ) : (
        !err && <div>Carregando...</div>
      )}
      <button onClick={logout} style={{marginTop:12}}>Sair</button> 
    </div>
  );
}
