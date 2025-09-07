import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// carrega token salvo (se houver)
const token = localStorage.getItem('accessToken');
if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function setAuthToken(t?: string) {
  if (t) {
    localStorage.setItem('accessToken', t);
    api.defaults.headers.common.Authorization = `Bearer ${t}`;
  } else {
    localStorage.removeItem('accessToken');
    delete api.defaults.headers.common.Authorization;
  }
}

export default api;
