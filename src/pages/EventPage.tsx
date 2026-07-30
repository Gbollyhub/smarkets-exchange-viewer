import { Link, useParams } from "react-router-dom";
import EventSummaryCard from "@/components/EventSummaryCard";
import MarketSection from "@/components/MarketSection";
import { useEventDetail } from "@/hooks/useEventDetail";
import { useEventMarkets } from "@/hooks/useEventMarkets";
import { useEffect, useMemo, useState } from "react";
import { useContracts } from "@/hooks/useContracts";
import { useQuotes } from "@/hooks/useQuotes";
import type { Contract, QuotesResponse } from "@/types";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

type Props = {};

export default function EventPage({}: Props) {
  // track which markets are expanded; open the first by default
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const { id = "" } = useParams();

  const { data: event, isLoading: eventLoading, isError } = useEventDetail(id);
  const { data: markets = [] } = useEventMarkets(id);

  const visibleMarketIds = useMemo(
    () => markets.filter((m) => openIds.has(m.id)).map((m) => m.id),
    [markets, openIds],
  );
  const { data: contracts = [] } = useContracts(visibleMarketIds);
  const { data: quotes = {} as QuotesResponse } = useQuotes(visibleMarketIds);

  const contractsByMarket = useMemo(() => {
    const map = new Map<string, Contract[]>();
    contracts.forEach((c) => {
      const list = map.get(c.market_id) ?? [];
      list.push(c);
      map.set(c.market_id, list);
    });
    return map;
  }, [contracts]);

  useEffect(() => {
    if (markets.length && openIds.size === 0) {
      setOpenIds(new Set([markets[0].id]));
    }
  }, [markets, openIds.size]);

  const toggle = (marketId: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(marketId) ? next.delete(marketId) : next.add(marketId);
      return next;
    });
  };

  if (eventLoading) return <div className="p-6">Loading event…</div>;
  if (isError || !event)
    return <div className="p-6">Couldn't load this event.</div>;

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans text-sm px-8">
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
            />
          );
        })}
      </div>
      <div className="h-8" />
    </div>
  );
}
