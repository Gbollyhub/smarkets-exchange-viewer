import { useState } from "react";

export function useHomeFilters() {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [activeFilter, setActiveFilter] = useState("Tomorrow");
  const [sectionOpen, setSectionOpen] = useState(true);

  return {
    activeTab,
    setActiveTab,
    activeFilter,
    setActiveFilter,
    sectionOpen,
    setSectionOpen,
  };
}
