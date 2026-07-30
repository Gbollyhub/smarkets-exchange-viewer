type Size = "sm" | "md";

type Props = {
  items: string[];
  active: string;
  onChange: (item: string) => void;
  size?: Size;
  className?: string;
};

const sizeConfig: Record<Size, { button: string; gap: string }> = {
  sm: { button: "px-4 py-1.5 text-xs", gap: "gap-2" },
  md: { button: "px-4 py-2 text-sm", gap: "gap-1" },
};

export default function PillTabs({ items, active, onChange, size = "sm", className = "" }: Props) {
  const { button, gap } = sizeConfig[size];

  return (
    <div className={`flex ${gap} ${className}`}>
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`rounded-full font-medium transition-colors ${button} ${
            active === item ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
