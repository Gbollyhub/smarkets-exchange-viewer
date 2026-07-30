import { useQuery } from "@tanstack/react-query";
import { getPopularEventIds, getEventsByIds } from "@/api/events";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function usePopularEvent() {
  const { token } = useAuthContext();

  // Two calls, not one: the API only gives us the popular event *ids* up
  // front, so we have to wait for those before we can ask for the actual
  // event details. The second query stays disabled until the first resolves.
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

  return {
    events: eventsQuery.data,
    isLoading: popularEventsIds.isLoading || eventsQuery.isLoading,
    isError: popularEventsIds.isError || eventsQuery.isError,
  };
}
