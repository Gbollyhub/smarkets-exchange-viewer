import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { toast } from "sonner";
import LOGIN from "@/api/auth";
import { useAuthContext } from "@/hooks/useAuthContext";
import type { AuthResponse } from "@/types";
import { useLocation, useNavigate } from "react-router-dom";

export default function useAuth() {
  const { setSession } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, saveRememberDevice] = useState(false);
  const canContinue = email.length > 0 && password.length > 0;

  const loginMutation = useMutation<
    AuthResponse,
    AxiosError,
    { email: string; password: string; remember: boolean }
  >({
    mutationFn: LOGIN,

    onSuccess: (data) => {
        setSession(data.token);
      toast.success("Login successful");
      navigate(from, { replace: true });
    },

    onError: (error) => {
      if (error.response?.status === 400) {
        toast.error("Invalid request");
      }

      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      }

      if (error.response?.status === 500) {
        toast.error("Server error, try again later");
      }
    },
  });

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation.mutate({
      email,
      password,
      remember: rememberDevice,
    });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    rememberDevice,
    saveRememberDevice,
    canContinue,
    loginMutation,
    handleLoginSubmit,
  };
}
