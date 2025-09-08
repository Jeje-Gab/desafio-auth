import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("accessToken");
  if (token) return <Navigate to="/profile" replace />;
  return children;
}
