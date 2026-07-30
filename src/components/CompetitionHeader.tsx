import { StarIcon, ChevronUpIcon } from "@/components/icons";

type Props = {
  title: string;
  count: number;
  open: boolean;
  onToggle: () => void;
};

export default function CompetitionHeader({ title, count, open, onToggle }: Props) {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 py-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-300 text-xs font-medium text-gray-700">
          {count}
        </span>
        <StarIcon className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-yellow-400 transition-colors" />
      </div>
      <div className="flex items-center gap-3">
        <button className="text-xs font-medium text-blue-600 hover:text-blue-700">See all</button>
        <button
          onClick={onToggle}
          className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
        >
          <ChevronUpIcon
            className={`w-4 h-4 transition-transform duration-200 ${open ? "" : "rotate-180"}`}
          />
        </button>
      </div>
    </div>
  );
}
