import usePopularEvents from "@/hooks/usePopularEvents";
import { useOddSelection } from "@/hooks/useOddSelection";
import MatchCard from "@/components/MatchCard";
import type { PricedContract } from "@/types";
import { useFeaturedMarkets } from "@/hooks/useFeaturedMarkets";
import { useContracts } from "@/hooks/useContracts";
import { useQuotes } from "@/hooks/useQuotes";
import { useMemo } from "react";
import type { SmarketsEvent, Market, QuotesResponse } from "@/types";

interface BoardItem {
  event: SmarketsEvent;
  market: Market | undefined;
  contracts: PricedContract[];
}

function HomePage() {
  const {
    events = [],
    isLoading: eventsLoading,
    isError: eventsError,
  } = usePopularEvents();

  // only upcoming or in-play events, explicit allowlist
  const featuredEvents = useMemo<SmarketsEvent[]>(
    () => events.filter((e) => e.state === "upcoming" || e.state === "live"),
    [events],
  );

  const eventIds = useMemo<string[]>(
    () => featuredEvents.map((e) => e.id),
    [featuredEvents],
  );

  const { data: markets = [] } = useFeaturedMarkets(eventIds);
  const marketIds = useMemo<string[]>(
    () => markets.map((m) => m.id),
    [markets],
  );
  const { data: contracts = [] } = useContracts(marketIds);
  const { data: quotes = {} as QuotesResponse } = useQuotes(marketIds);
  const { selectedOdd, toggleOdd } = useOddSelection();

  // one view-model per event: its featured market + priced contracts
  const board = useMemo<BoardItem[]>(() => {
    return featuredEvents.map((event) => {
      const market = markets.find((m) => m.event_id === event.id);
      const marketContracts = market
        ? contracts.filter((c) => c.market_id === market.id)
        : [];
      const priced: PricedContract[] = marketContracts.map((c) => ({
        id: c.id,
        name: c.name,
        buy: quotes[c.id]?.offers?.[0]?.price,
        sell: quotes[c.id]?.bids?.[0]?.price,
      }));
      return { event, market, contracts: priced };
    });
  }, [featuredEvents, markets, contracts, quotes]);

  if (eventsLoading) return <div className="p-6">Loading featured events…</div>;
  if (eventsError)
    return <div className="p-6">Couldn't load events. Try again.</div>;
  if (featuredEvents.length === 0)
    return <div className="p-6">No featured events right now.</div>;

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans text-sm">
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Featured events</h1>
          <span className="text-xs text-gray-500">Live · updates every 4s</span>
        </div>

        {board.map(({ event, market, contracts }: any) => (
          <MatchCard
            key={event.id}
            event={event}
            market={market}
            contracts={contracts}
            selectedOdd={selectedOdd}
            onToggleOdd={toggleOdd}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
