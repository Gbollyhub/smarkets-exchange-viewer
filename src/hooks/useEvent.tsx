import { useQuery } from "@tanstack/react-query";
import EVENT_NAVIGIATION from "@/api/user";
import { useAuthContext } from "@/context/AuthContext";

export function useEvent() {
  const { token } = useAuthContext();
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: EVENT_NAVIGIATION,
    enabled: !!token,       
    staleTime: 5 * 60 * 1000
  });
}