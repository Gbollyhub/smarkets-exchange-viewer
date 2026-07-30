import { useQuery } from "@tanstack/react-query";
import getNavigation from "@/api/event";
import { useAuthContext } from "@/context/AuthContext";

export function useEvent() {
  const { token } = useAuthContext();
  console.log("token in useEvent:", token);
  const eventNavigation = useQuery({
    queryKey: ["navigation"],
    queryFn: getNavigation,
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
  console.log("status:", eventNavigation.status, eventNavigation.fetchStatus);

  return {
    eventNavigation,
  };
}
