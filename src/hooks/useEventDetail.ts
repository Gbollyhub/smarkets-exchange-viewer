import { getEventById } from "@/api/events";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";

export function useEventDetail(id: string) {
  const { token } = useAuthContext();
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
    enabled: !!token && !!id, // guard against firing with an empty id while the route param is still resolving
  });
}
