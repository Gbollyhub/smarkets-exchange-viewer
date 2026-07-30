import { createContext } from "react";

export type AuthState = {
  token: string | null;
  isReady: boolean;
  setSession: (token: string) => void;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthState | null>(null);
