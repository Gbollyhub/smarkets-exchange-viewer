import { formatDecimal } from "@/lib/misc";
import type { PricedContract } from "@/types";

type Props = {
  id: string;
  value: PricedContract;
  selected: boolean;
  onToggle: (id: string) => void;
  stopPropagation?: boolean;
  size?: "xs" | "sm";
};

export default function OddButton({ value, size = "sm" }: Props) {
  return (
    <div
      className={`${size === "xs" ? "text-xs" : "text-sm"} flex flex-col
        border border-gray-300 rounded-sm p-3 text-center font-semibold rounded transition-colors`}
    >
      <span className="text-sm mb-2">{value.name}</span>
      <div className="flex flex-row justify-center gap-4">
         <span className="p-2 stext-center text-sm font-semibold rounded bg-green-600 text-white py-1">
        {formatDecimal(value.buy)}
      </span>
      <span className="p-2 text-center text-sm font-semibold rounded bg-blue-600 text-white py-1">
        {formatDecimal(value.sell)}
      </span>
      </div>
     
    </div>
  );
}
