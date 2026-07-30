// hooks/useFeaturedMarkets.ts
import { useQuery } from "@tanstack/react-query";
import { getFeaturedMarkets } from "@/api/markets";
import { useAuthContext } from "@/context/AuthContext";

export function useFeaturedMarkets(eventIds: string[]) {
  const { token } = useAuthContext();
  return useQuery({
    queryKey: ["featuredMarkets", eventIds],
    queryFn: () => getFeaturedMarkets(eventIds),
    enabled: !!token && eventIds.length > 0,
  });
}