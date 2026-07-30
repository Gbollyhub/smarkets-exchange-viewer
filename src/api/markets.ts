import api from "@/lib/api";
import type { Market, MarketsResponse } from "@/types";

export async function getFeaturedMarkets(
  eventIds: string[],
): Promise<Market[]> {
  const { data } = await api.get<MarketsResponse>(
    `/v3/events/${eventIds.join(",")}/markets/`,
    { params: { limit_by_event: 1 } },
  );
  return data.markets;
}

export async function getEventMarkets(eventId: string): Promise<Market[]> {
  const { data } = await api.get<MarketsResponse>(
    `/v3/events/${eventId}/markets/`,
    { params: { sort: "event_id,display_order" } }, // all markets, ordered
  );
  return data.markets;
}
