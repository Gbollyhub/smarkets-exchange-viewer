import { getEventById } from "@/api/events";
import { useAuthContext } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";

export function useEventDetail(id: string) {
  const { token } = useAuthContext();
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
    enabled: !!token && !!id,
  });
}