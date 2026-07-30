import { Link, useParams } from "react-router-dom";
import EventSummaryCard from "@/components/EventSummaryCard";
import MarketSection from "@/components/MarketSection";
import { useEventDetail } from "@/hooks/useEventDetail";
import { useEventMarkets } from "@/hooks/useEventMarkets";
import { useMemo, useState } from "react";
import { useContracts } from "@/hooks/useContracts";
import { useQuotes } from "@/hooks/useQuotes";
import { useOddSelection } from "@/hooks/useOddSelection";
import type { Contract, QuotesResponse } from "@/types";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function EventPage() {
  // track which markets are expanded; open the first by default
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  // which event we've already auto-opened a market for, so it only happens
  // once per event rather than every time openIds happens to be empty
  const [autoOpenedEventId, setAutoOpenedEventId] = useState<string | null>(
    null,
  );

  const { id = "" } = useParams();

  const { data: event, isLoading: eventLoading, isError } = useEventDetail(id);
  const { data: markets = [] } = useEventMarkets(id);

  // Deliberately lazy: an event can have dozens of markets, so we only pull
  // contracts/prices for the ones the user has actually expanded, not every
  // market up front.
  const visibleMarketIds = useMemo(
    () => markets.filter((m) => openIds.has(m.id)).map((m) => m.id),
    [markets, openIds],
  );
  const { data: contracts = [] } = useContracts(visibleMarketIds);
  const { data: quotes = {} as QuotesResponse } = useQuotes(visibleMarketIds);
  const { isOddSelected, toggleOdd } = useOddSelection();

  const contractsByMarket = useMemo(() => {
    const map = new Map<string, Contract[]>();
    contracts.forEach((c) => {
      const list = map.get(c.market_id) ?? [];
      list.push(c);
      map.set(c.market_id, list);
    });
    return map;
  }, [contracts]);

  // Land on the page with the top market already expanded rather than a wall
  // of collapsed headers. This adjusts state during render (React's own
  // recommendation for "reset/derive state when something changes") instead
  // of an effect, guarded by autoOpenedEventId so it fires once per event -
  // closing every section by hand no longer pops the first one back open.
  if (markets.length > 0 && autoOpenedEventId !== id) {
    setAutoOpenedEventId(id);
    setOpenIds(new Set([markets[0].id]));
  }

  const toggle = (marketId: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(marketId)) {
        next.delete(marketId);
      } else {
        next.add(marketId);
      }
      return next;
    });
  };

  if (eventLoading) return <div className="p-6">Loading event…</div>;
  if (isError || !event)
    return <div className="p-6">Couldn't load this event.</div>;

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans text-sm px-4">
      <div className="mt-8">
        <Link
          to="/"
          className="flex flex-row text-sm text-gray-500 gap-x-2 mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <p>Back to events</p>
        </Link>
      </div>

      {/* event header */}
      <EventSummaryCard
        eventName={event.name}
        eventType={event.type}
        eventState={event.state}
        kickoff={new Date(event.start_datetime).toLocaleString()}
        venue={event.venue?.name}
      />

      <div className="flex flex-col gap-3">
        {markets.map((market) => {
          const isOpen = openIds.has(market.id);
          const marketContracts = contractsByMarket.get(market.id) ?? [];
          return (
            <MarketSection
              key={market.id}
              market={market}
              isOpen={isOpen}
              onToggle={toggle}
              quotes={quotes}
              marketContracts={marketContracts}
              isOddSelected={isOddSelected}
              onToggleOdd={toggleOdd}
            />
          );
        })}
      </div>
      <div className="h-8" />
    </div>
  );
}
