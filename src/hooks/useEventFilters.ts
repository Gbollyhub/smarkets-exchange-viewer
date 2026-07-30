import { useState } from "react";

export function useEventFilters() {
  const [activeMarket, setActiveMarket] = useState("All");
  const [graphView, setGraphView] = useState(true);
  const [dnbOpen, setDnbOpen] = useState(true);
  const [htftOpen, setHtftOpen] = useState(true);

  return {
    activeMarket,
    setActiveMarket,
    graphView,
    setGraphView,
    dnbOpen,
    setDnbOpen,
    htftOpen,
    setHtftOpen,
  };
}
