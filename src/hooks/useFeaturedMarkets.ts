// hooks/useFeaturedMarkets.ts
import { useQuery } from "@tanstack/react-query";
import { getFeaturedMarkets } from "@/api/markets";
import { useAuthContext } from "@/hooks/useAuthContext";

export function useFeaturedMarkets(eventIds: string[]) {
  const { token } = useAuthContext();
  return useQuery({
    queryKey: ["featuredMarkets", eventIds],
    queryFn: () => getFeaturedMarkets(eventIds),
    enabled: !!token && eventIds.length > 0, // waits on auth, and on there actually being events to look up
  });
}
