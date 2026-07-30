import { useState } from "react";

export function useOddSelection() {
  const [selectedOdd, setSelectedOdd] = useState<string | null>(null);

  const toggleOdd = (id: string) => {
    setSelectedOdd((prev) => (prev === id ? null : id));
  };

  return { selectedOdd, toggleOdd };
}
