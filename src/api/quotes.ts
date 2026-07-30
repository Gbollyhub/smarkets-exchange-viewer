import api from "@/lib/api";
import type { QuotesResponse } from "@/types";

export async function getQuotes(marketIds: string[]): Promise<QuotesResponse> {
  const { data } = await api.get<QuotesResponse>(
    `/v3/markets/${marketIds.join(",")}/quotes/`,
  );
  return data;
}
