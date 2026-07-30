type Props = {
  firstColumnLabel?: string;
  bordered?: boolean;
};

export default function OddsTableHeader({ firstColumnLabel = "£0", bordered = false }: Props) {
  return (
    <div className={`grid grid-cols-3 px-4 py-2 bg-gray-50 ${bordered ? "border-b border-gray-100" : ""}`}>
      <span className="text-xs text-gray-400">{firstColumnLabel}</span>
      <span className="text-xs text-gray-400 text-center font-medium">BUY</span>
      <span className="text-xs text-gray-400 text-center font-medium">SELL</span>
    </div>
  );
}
