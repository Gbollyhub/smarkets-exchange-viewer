import { formatEventType } from "@/lib/misc";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { ClockIcon, BuildingOfficeIcon } from "@heroicons/react/24/solid";

type Props = {
  eventName: string;
  eventType: string;
  eventState: string;
  kickoff: string;
  venue: string | undefined;
};

export default function EventSummaryCard({
  eventName,
  eventType,
  eventState,
  kickoff,
  venue,
}: Props) {
  return (
    <div className="mb-4 bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Card header */}
      <div className="text-xs text-gray-500 px-5 pt-5 capitalize">{formatEventType(eventType)}</div>
      <div className="flex items-start justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold text-gray-900 leading-tight">{eventName}</div>
          {eventState === "live" && (
            <span className="text-sm text-red-600 flex flex-row gap-1"><PlayCircleIcon className="w-4 h-4 fill-red-600"/> Live</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between px-5 pb-4">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <ClockIcon className="w-3.5 h-3.5" />
            {kickoff}
          </span>
          <span className="flex items-center gap-1.5">
            <BuildingOfficeIcon className="w-3.5 h-3.5" />
            {venue ? ` · ${venue}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
