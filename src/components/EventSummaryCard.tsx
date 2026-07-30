import type { MarketOddsRow } from "@/types";
import OddsTableHeader from "@/components/OddsTableHeader";
import OddsRow from "@/components/OddsRow";
import { ClockIcon, StadiumIcon, GraphIcon, BookIcon, ExpandIcon } from "@/components/icons";

type Props = {
  homeTeam: string;
  awayTeam: string;
  kickoff: string;
  venue: string;
  graphView: boolean;
  onGraphViewChange: (value: boolean) => void;
  odds: MarketOddsRow[];
  selectedOdd: string | null;
  onToggleOdd: (id: string) => void;
};

export default function EventSummaryCard({
  homeTeam,
  awayTeam,
  kickoff,
  venue,
  graphView,
  onGraphViewChange,
  odds,
  selectedOdd,
  onToggleOdd,
}: Props) {
  return (
    <div className="mx-4 sm:mx-6 mb-4 bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Card header */}
      <div className="flex items-start justify-between px-5 pt-5 pb-3">
        <div>
          <div className="text-lg font-bold text-gray-900 leading-tight">{homeTeam}</div>
          <div className="text-lg font-bold text-gray-900 leading-tight">{awayTeam}</div>
        </div>
        <div className="text-right">
          <span className="font-bold text-gray-800 text-base tracking-tight">
            <span className="italic">S</span>markets
          </span>
        </div>
      </div>

      {/* Match info + Graph/OrderBook toggle */}
      <div className="flex items-center justify-between px-5 pb-4">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <ClockIcon className="w-3.5 h-3.5" />
            {kickoff}
          </span>
          <span className="flex items-center gap-1.5">
            <StadiumIcon className="w-3.5 h-3.5" />
            {venue}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onGraphViewChange(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
              graphView
                ? "bg-white border-blue-400 text-blue-600"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <GraphIcon className="w-3.5 h-3.5" />
            Graph
          </button>
          <button
            onClick={() => onGraphViewChange(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
              !graphView
                ? "bg-white border-blue-400 text-blue-600"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <BookIcon className="w-3.5 h-3.5" />
            Order Book
          </button>
        </div>
      </div>

      {/* Table + Chart area */}
      <div className="border-t border-gray-100 flex flex-col sm:flex-row">
        {/* Odds table */}
        <div className="sm:w-56 flex-shrink-0 border-r border-gray-100">
          <OddsTableHeader bordered />
          {odds.map((row) => (
            <OddsRow
              key={row.contract}
              row={row}
              idPrefix={`main-${row.contract}`}
              selectedOdd={selectedOdd}
              onToggleOdd={onToggleOdd}
              className="py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
            />
          ))}
        </div>

        {/* Graph / no-data area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center py-8 px-6">
            <p className="text-xs text-gray-400">No data available for the selected contracts.</p>
          </div>
          {/* Legend row */}
          <div className="border-t border-gray-100 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="font-medium">10</span>
              <span className="font-semibold text-gray-700">ALL</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                Bay of Plenty
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                Waikato
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />
                Draw
              </span>
              <button className="ml-1 text-gray-400 hover:text-gray-600">
                <ExpandIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
