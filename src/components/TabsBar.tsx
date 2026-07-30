type Props = {
  items: string[];
  active: string;
  onChange: (item: string) => void;
};

export default function TabsBar({ items, active, onChange }: Props) {
  return (
    <div className="flex border-b border-gray-300 px-4 sm:px-6">
      {items.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
            active === tab
              ? "border-green-500 text-green-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
