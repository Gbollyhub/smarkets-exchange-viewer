import type { ReactNode } from "react";
import { ChevronUpIcon, BookIcon } from "@/components/icons";

type Props = {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
};

export default function MarketSection({ title, open, onToggle, children }: Props) {
  return (
    <div className="mx-4 sm:mx-6 mb-4 bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-800 border border-gray-200 rounded px-2.5 py-1 hover:bg-gray-50 transition-colors">
            <BookIcon className="w-3.5 h-3.5" />
            Order Book
          </button>
          <button
            onClick={onToggle}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronUpIcon
              className={`w-4 h-4 transition-transform duration-200 ${open ? "" : "rotate-180"}`}
            />
          </button>
        </div>
      </div>
      {open && children}
    </div>
  );
}
