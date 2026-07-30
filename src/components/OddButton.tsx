type Props = {
  id: string;
  value: number;
  type: "buy" | "sell";
  selected: boolean;
  onToggle: (id: string) => void;
  stopPropagation?: boolean;
  size?: "xs" | "sm";
};

export default function OddButton({
  id,
  value,
  type,
  selected,
  onToggle,
  stopPropagation = false,
  size = "sm",
}: Props) {
  const isBuy = type === "buy";

  return (
    <button
      onClick={(e) => {
        if (stopPropagation) e.stopPropagation();
        onToggle(id);
      }}
      className={`${size === "xs" ? "text-xs" : "text-sm"} font-semibold px-1.5 py-0.5 rounded transition-colors ${
        isBuy
          ? selected
            ? "bg-green-600 text-white"
            : "text-green-600 hover:bg-green-50"
          : selected
            ? "bg-blue-600 text-white"
            : "text-blue-600 hover:bg-blue-50"
      }`}
    >
      {value}
    </button>
  );
}
