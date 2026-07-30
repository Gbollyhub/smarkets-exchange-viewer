import { getEventMarkets } from "@/api/markets";
import { useAuthContext } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";

export function useEventMarkets(eventId: string) {
  const { token } = useAuthContext();
  return useQuery({
    queryKey: ["eventMarkets", eventId],
    queryFn: () => getEventMarkets(eventId),
    enabled: !!token && !!eventId,
  });
}