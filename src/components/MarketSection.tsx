import type { Contract, Market, QuotesResponse } from "@/types";
import { formatDecimal } from "@/lib/misc";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

type Props = {
  market: Market;
  isOpen: boolean;
  onToggle: (id: string) => void;
  marketContracts: Contract[];
  quotes: QuotesResponse;
  isOddSelected: (id: string) => boolean;
  onToggleOdd: (id: string) => void;
};

export default function MarketSection({
  market,
  isOpen,
  onToggle,
  marketContracts,
  quotes,
  isOddSelected,
  onToggleOdd,
}: Props) {
  return (
    <div
      key={market.id}
      className="mb-4 bg-white rounded-lg border border-gray-200 overflow-hidden"
    >
      <button
        onClick={() => onToggle(market.id)}
        className="cursor-pointer w-full flex items-center justify-between px-4 py-3 font-medium "
      >
        <span>{market.name}</span>

        <ChevronUpIcon
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "" : "rotate-180"}`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-gray-100 pb-2">
          <div className="grid grid-cols-[1fr_80px_80px] gap-2 px-4 py-2 text-xs text-gray-400">
            <span />
            <span className="text-center">Buy</span>
            <span className="text-center">Sell</span>
          </div>

          {marketContracts.map((c) => {
            const book = quotes[c.id];
            // "buy"/"sell" here are from the trader's point of view, which is
            // the opposite of the book's own naming: offers are what you buy
            // at, bids are what you sell at. [0] is just the best (top) price.
            const buy = book?.offers?.[0]?.price;
            const sell = book?.bids?.[0]?.price;
            const buyId = `${c.id}-buy`;
            const sellId = `${c.id}-sell`;
            return (
              <div
                key={c.id}
                className="grid grid-cols-[1fr_80px_80px] gap-2 px-4 py-1.5 items-center"
              >
                <span className="text-sm">{c.name}</span>
                <button
                  type="button"
                  onClick={() => onToggleOdd(buyId)}
                  className={`cursor-pointer text-center text-sm font-semibold rounded py-1 transition-colors ${
                    isOddSelected(buyId) ? "bg-gray-700 text-white" : "bg-green-600 text-white"
                  }`}
                >
                  {formatDecimal(buy)}
                </button>
                <button
                  type="button"
                  onClick={() => onToggleOdd(sellId)}
                  className={`cursor-pointer text-center text-sm font-semibold rounded py-1 transition-colors ${
                    isOddSelected(sellId) ? "bg-gray-700 text-white" : "bg-blue-600 text-white"
                  }`}
                >
                  {formatDecimal(sell)}
                </button>
              </div>
            );
          })}

          {marketContracts.length === 0 && (
            <div className="px-4 py-2 text-sm text-gray-400">No prices yet</div>
          )}
        </div>
      )}
    </div>
  );
}
