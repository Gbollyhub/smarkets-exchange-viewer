import type { Sport } from "@/types";
import {
  StarIcon,
} from "@/components/icons";

type Props = {
  sports: Sport[];
  onBack?: () => void;
  showAllButton?: boolean;
  showMoreIndicator?: boolean;
};

export default function SportsSubNav({
  sports,
  showAllButton = false,
}: Props) {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0">
      <div className="flex items-center h-11 px-3 gap-1 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-0 flex-1 overflow-x-auto scrollbar-hide">
          {showAllButton && (
            <button className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded whitespace-nowrap">
              All
            </button>
          )}
          {sports.map((sport) => (
            <button
              key={sport.name}
              className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                sport.active
                  ? "text-gray-900 bg-gray-100"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <sport.icon className="w-3.5 h-3.5" />
              <span>{sport.name}</span>
              <StarIcon className="w-3 h-3 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
