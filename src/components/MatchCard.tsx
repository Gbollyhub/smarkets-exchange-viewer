import type { Market, PricedContract, SmarketsEvent } from "@/types";
import { Link } from "react-router-dom";
import { formatEventType, formatDecimal } from "@/lib/misc";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

type Props = {
  event: SmarketsEvent;
  market: Market | undefined;
  contracts: PricedContract[];
  selectedOdd: string | null;
  onToggleOdd: (id: string) => void;
};

export default function MatchCard({ event, market, contracts }: Props) {
  return (
    <Link
      to={`/events/${event.id}`}
      key={event.id}
      className="p-4 bg-white rounded-md border border-gray-200 overflow-hidden cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs text-gray-500 capitalize">
            {formatEventType(event.type)}
          </div>
          <div className="font-medium">{event.short_name || event.name}</div>
        </div>
        {event.state === "live" ? (
            <span className="text-xs text-red-600 flex flex-row gap-1"><PlayCircleIcon className="w-4 h-4 fill-red-600"/> Live</span>
        ) : (
          <span className="text-xs text-gray-500">
            {new Date(event.start_datetime).toLocaleString([], {
              weekday: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>

      {market && (
        <div className="text-xs text-gray-500 mb-2">{market.name}</div>
      )}

      <div className="border-t border-gray-100 pt-2">
        <div className="grid grid-cols-[1fr_80px_80px] gap-2 py-2 text-xs text-gray-400">
          <span />
          <span className="text-center">Buy</span>
          <span className="text-center">Sell</span>
        </div>

        {contracts.map((c) => (
          <div
            key={c.id}
            className="grid grid-cols-[1fr_80px_80px] gap-2 py-1.5 items-center"
          >
            <span className="text-sm">{c.name}</span>
            <span className="text-center text-sm font-semibold rounded bg-green-600 text-white py-1">
              {formatDecimal(c.buy)}
            </span>
            <span className="text-center text-sm font-semibold rounded bg-blue-600 text-white py-1">
              {formatDecimal(c.sell)}
            </span>
          </div>
        ))}

        {contracts.length === 0 && (
          <div className="py-2 text-sm text-gray-400">No prices yet</div>
        )}
      </div>
    </Link>
  );
}
