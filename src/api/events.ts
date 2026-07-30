import api from "@/lib/api";
import type {
  EventsResponse,
  PopularEventIdsResponse,
  SmarketsEvent,
} from "@/types";

const eventNavigation = async () => {
  const { data } = await api.get("/v3/navigation/");

  return data;
};

async function getPopularEventIds(): Promise<string[]> {
  const { data } = await api.get<PopularEventIdsResponse>(
    "/v3/popular/event_ids/",
    {
      params: { platform: "exchange", limit: 10 },
    },
  );

  return data.popular_event_ids;
}

async function getEventsByIds(ids: string[]): Promise<SmarketsEvent[]> {
  const { data } = await api.get<EventsResponse>(
    `/v3/events/${ids.join(",")}/`,
  );
  return data.events;
}

const getPopularEvents = async () => {
  const { data } = await api.get("/v3/popular/home/");

  return data;
};

export async function getEventById(id: string): Promise<SmarketsEvent | undefined> {
  const { data } = await api.get<EventsResponse>(`/v3/events/${id}/`);
  return data.events[0]; // events-by-id returns an array; take the one
}

export {
  eventNavigation,
  getPopularEventIds,
  getEventsByIds,
  getPopularEvents,
};
