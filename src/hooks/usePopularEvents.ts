import { useQuery } from "@tanstack/react-query";
import { getPopularEventIds, getEventsByIds, getPopularEvents } from "@/api/events";
import { useAuthContext } from "@/context/AuthContext";

export default function usePopularEvent() {
  const { token } = useAuthContext();

  const popularEventsIds = useQuery({
    queryKey: ["popularIds"],
    queryFn: getPopularEventIds,
    enabled: !!token,
  });

  const eventsQuery = useQuery({
    queryKey: ["events", "popular", popularEventsIds.data],
    queryFn: () => getEventsByIds(popularEventsIds.data!),
    enabled: !!popularEventsIds.data && popularEventsIds.data.length > 0,
  });

  const popularEvents = useQuery({
    queryKey: ["popularEvents"],
    queryFn: getPopularEvents,
    enabled: !!token,
  });

  return {
    events: eventsQuery.data,
    isLoading: popularEventsIds.isLoading || eventsQuery.isLoading,
    isError: popularEventsIds.isError || eventsQuery.isError,
    popularEvents,
  };
}
