import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

export default function GuestRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("accessToken");
  if (token) return <Navigate to="/profile" replace />;
  return <>{children}</>;
}
