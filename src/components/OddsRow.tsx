import type { MarketOddsRow } from "@/types";
import OddButton from "@/components/OddButton";

type Props = {
  row: MarketOddsRow;
  idPrefix: string;
  selectedOdd: string | null;
  onToggleOdd: (id: string) => void;
  className?: string;
};

export default function OddsRow({ row, idPrefix, selectedOdd, onToggleOdd, className = "" }: Props) {
  const buyId = `${idPrefix}-buy`;
  const sellId = `${idPrefix}-sell`;

  return (
    <div className={`grid grid-cols-3 items-center px-4 ${className}`}>
      <span className="text-xs text-gray-700 truncate pr-1">{row.contract}</span>
      <div className="flex justify-center">
        <OddButton
          id={buyId}
          value={row.buy}
          type="buy"
          selected={selectedOdd === buyId}
          onToggle={onToggleOdd}
          size="xs"
        />
      </div>
      <div className="flex justify-center">
        <OddButton
          id={sellId}
          value={row.sell}
          type="sell"
          selected={selectedOdd === sellId}
          onToggle={onToggleOdd}
          size="xs"
        />
      </div>
    </div>
  );
}
