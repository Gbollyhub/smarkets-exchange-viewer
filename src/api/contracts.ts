import api from "@/lib/api";
import type { Contract, ContractsResponse } from "@/types";

export async function getContracts(marketIds: string[]): Promise<Contract[]> {
  const { data } = await api.get<ContractsResponse>(
    `/v3/markets/${marketIds.join(",")}/contracts/`,
  );
  return data.contracts;
}
