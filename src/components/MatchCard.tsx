import type { Match, OddsValue } from "@/types";
import OddButton from "@/components/OddButton";
import { ClockIcon } from "@/components/icons";

type Props = {
  match: Match;
  selectedOdd: string | null;
  onToggleOdd: (id: string) => void;
  onSelect: (match: Match) => void;
};

export default function MatchCard({ match, selectedOdd, onToggleOdd, onSelect }: Props) {
  return (
    <div
      className="bg-white rounded-md border border-gray-200 overflow-hidden cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
      onClick={() => onSelect(match)}
    >
      <div className="flex items-stretch">
        {/* Left: team names + match info */}
        <div className="flex-1 px-4 py-3 min-w-0">
          <div className="text-sm font-medium text-gray-900 leading-snug">{match.home}</div>
          <div className="text-sm font-medium text-gray-900 leading-snug mb-2">{match.away}</div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <ClockIcon className="w-3 h-3 flex-shrink-0" />
            <span>{match.time}</span>
            <span>•</span>
            <span>{match.country}</span>
          </div>
        </div>

        {/* Right: odds columns */}
        <div className="flex divide-x divide-gray-100 border-l border-gray-100">
          {(Object.entries(match.odds) as [string, OddsValue][]).map(([colKey, col]) => (
            <div
              key={col.label}
              className="flex flex-col items-center justify-center px-3 sm:px-5 py-3 gap-2 min-w-[72px] sm:min-w-[90px]"
            >
              <span className="text-[11px] text-gray-500 font-medium whitespace-nowrap">
                {col.label}
              </span>
              <div className="flex gap-2">
                {col.values.map((val, i) => {
                  const id = `${match.id}-${colKey}-${i}`;
                  return (
                    <OddButton
                      key={i}
                      id={id}
                      value={val}
                      type={i === 0 ? "buy" : "sell"}
                      selected={selectedOdd === id}
                      onToggle={onToggleOdd}
                      stopPropagation
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
