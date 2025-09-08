import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* raiz: manda para /profile se logado, senão /login */}
        <Route path="/" element={
          localStorage.getItem("accessToken")
            ? <Navigate to="/profile" replace />
            : <Navigate to="/login" replace />
        } />

        {/* páginas de convidado: só aparecem se NÃO estiver logado */}
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />

        {/* páginas protegidas: precisam de token */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        {/* alias /me para a mesma página protegida */}
        <Route path="/me" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Layout>
  );
}
