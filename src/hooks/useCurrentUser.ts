import { useQuery } from "@tanstack/react-query";
import GETUSER from "@/api/user";
import { useAuthContext } from "@/hooks/useAuthContext";

export function useCurrentUser() {
  const { token } = useAuthContext();
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: GETUSER,
    enabled: !!token,       
    staleTime: 5 * 60 * 1000
  });
}