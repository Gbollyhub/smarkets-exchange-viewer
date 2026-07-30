// features/auth/PublicOnly.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext";

// The other half of RequireAuth: keeps already-logged-in users off pages
// like /login (no reason to show a login form to someone who's signed in).
export default function PublicOnly() {
  const { token } = useAuthContext();
  return token ? <Navigate to="/" replace /> : <Outlet />;
}