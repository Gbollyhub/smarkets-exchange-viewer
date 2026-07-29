// context/AuthContext.tsx
import { createContext, useContext, useState } from "react";
import api from "@/lib/api";

type AuthState = {
  token: string | null;
  email: string | null;
  isReady: boolean;
  setSession: (token: string, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

// read once at startup
function readStoredToken(): string | null {
  return localStorage.getItem("smk_token");
}

function readStoredEmail(): string | null {
  return localStorage.getItem("smk_email");
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    const stored = readStoredToken();
    if (stored) api.defaults.headers.common["Authorization"] = `Session-Token ${stored}`;
    return stored;
  });

  const [email, setEmail] = useState<string | null>(() => readStoredEmail());

  // with a synchronous read there's no async gap, so we're ready immediately
  const [isReady] = useState(true);

  const setSession = (token: string, email: string) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem("smk_token", token);
    localStorage.setItem("smk_email", email);
    api.defaults.headers.common["Authorization"] = `Session-Token ${token}`;
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("smk_token");
    localStorage.removeItem("smk_email");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ token, email, isReady, setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}