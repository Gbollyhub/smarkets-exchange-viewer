import usePopularEvents from "@/hooks/usePopularEvents";
import { useOddSelection } from "@/hooks/useOddSelection";
import MatchCard from "@/components/MatchCard";
import type { PricedContract } from "@/types";
import { useFeaturedMarkets } from "@/hooks/useFeaturedMarkets";
import { useContracts } from "@/hooks/useContracts";
import { useQuotes } from "@/hooks/useQuotes";
import { useMemo } from "react";
import type { SmarketsEvent, Market, QuotesResponse } from "@/types";

// What one row on the homepage actually needs, after we've stitched together
// four separate API responses (events, markets, contracts, quotes) that don't
// come back pre-joined.
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

  // useMemo here isn't just tidiness - these arrays feed straight into query
  // keys below, so a new array identity on every render would mean react-query
  // treats it as a brand new query and refetches constantly.
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
  const { isOddSelected, toggleOdd } = useOddSelection();

  // Now join everything back up: for each featured event, find its one
  // featured market, then its contracts, then price each contract from the
  // quotes lookup (offers = what you'd buy at, bids = what you'd sell at).
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
          <span className="text-sm text-gray-500">Live · updates every 4s</span>
        </div>

        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {board.map(({ event, market, contracts }: any) => (
          <MatchCard
            key={event.id}
            event={event}
            market={market}
            contracts={contracts}
            isOddSelected={isOddSelected}
            onToggleOdd={toggleOdd}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
