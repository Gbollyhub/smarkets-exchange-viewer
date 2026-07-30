import api from "@/lib/api";
import type {
  EventsResponse,
  PopularEventIdsResponse,
  SmarketsEvent,
} from "@/types";

export async function getPopularEventIds(): Promise<string[]> {
  const { data } = await api.get<PopularEventIdsResponse>(
    "/v3/popular/event_ids/",
    {
      params: { platform: "exchange", limit: 10 },
    },
  );

  return data.popular_event_ids;
}

export async function getEventsByIds(ids: string[]): Promise<SmarketsEvent[]> {
  const { data } = await api.get<EventsResponse>(
    `/v3/events/${ids.join(",")}/`,
  );
  return data.events;
}

export async function getEventById(id: string): Promise<SmarketsEvent | undefined> {
  const { data } = await api.get<EventsResponse>(`/v3/events/${id}/`);
  return data.events[0];
}
