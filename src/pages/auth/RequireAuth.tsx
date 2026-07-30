import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext";

// Gatekeeper for anything behind a login (see PublicOnly for its mirror
// image). We stash the current location in redirect state so LoginForm can
// send the user back to whatever page they were actually trying to reach,
// instead of always dropping them on the homepage.
export default function RequireAuth() {
  const { token } = useAuthContext();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}