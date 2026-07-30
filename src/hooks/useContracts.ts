// hooks/useContracts.ts
import { useQuery } from "@tanstack/react-query";
import { getContracts } from "@/api/contracts";
import { useAuthContext } from "@/context/AuthContext";

export function useContracts(marketIds: string[]) {
  const { token } = useAuthContext();
  return useQuery({
    queryKey: ["contracts", marketIds],
    queryFn: () => getContracts(marketIds),
    enabled: !!token && marketIds.length > 0,
    staleTime: 5 * 60 * 1000, // names don't change, no need to refetch often
  });
}