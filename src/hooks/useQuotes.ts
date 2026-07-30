// hooks/useQuotes.ts
import { useQuery } from "@tanstack/react-query";
import { getQuotes } from "@/api/quotes";
import { useAuthContext } from "@/hooks/useAuthContext";

export function useQuotes(marketIds: string[]) {
  const { token } = useAuthContext();
  return useQuery({
    queryKey: ["quotes", marketIds],
    queryFn: () => getQuotes(marketIds),
    enabled: !!token && marketIds.length > 0,
    refetchInterval: 4000,
  });
}