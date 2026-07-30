import { getEventMarkets } from "@/api/markets";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";

export function useEventMarkets(eventId: string) {
  const { token } = useAuthContext();
  return useQuery({
    queryKey: ["eventMarkets", eventId],
    queryFn: () => getEventMarkets(eventId),
    enabled: !!token && !!eventId, // no point calling this before we know which event we're looking at
  });
}