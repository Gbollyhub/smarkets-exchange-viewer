// features/auth/PublicOnly.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

export default function PublicOnly() {
  const { token } = useAuthContext();
  return token ? <Navigate to="/" replace /> : <Outlet />;
}