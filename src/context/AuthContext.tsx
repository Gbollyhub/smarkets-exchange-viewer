// context/AuthContext.tsx
import { useState } from "react";
import api from "@/lib/api";
import { logoutSession } from "@/api/auth";
import { AuthContext } from "@/context/authContextValue";

// read once at startup
function readStoredToken(): string | null {
  return localStorage.getItem("smk_token");
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // with a synchronous read there's no async gap, so we're ready immediately
  const [isReady] = useState(true);

  const [token, setToken] = useState<string | null>(() => {
    const stored = readStoredToken();
    if (stored)
      api.defaults.headers.common["Authorization"] = `Session-Token ${stored}`;
    return stored;
  });

  const setSession = (token: string) => {
    setToken(token);
    localStorage.setItem("smk_token", token);
  };

  const logout = async () => {
    try {
      await logoutSession(); // tell the server to end the session
    } catch {
      // ignore, we log out locally regardless
    } finally {
      setToken(null);
      localStorage.removeItem("smk_token");
    }
  };

  return (
    <AuthContext.Provider value={{ token, isReady, setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
