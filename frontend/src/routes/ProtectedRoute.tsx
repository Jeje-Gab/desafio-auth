import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  if (!token) {
    // guarda de onde veio, se quiser usar depois
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
