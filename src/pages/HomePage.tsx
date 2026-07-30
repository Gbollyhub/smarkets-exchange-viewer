import { useNavigate } from "react-router-dom";
import { useEvent } from "@/hooks/useEvent";
import { useHomeFilters } from "@/hooks/useHomeFilters";
import { useOddSelection } from "@/hooks/useOddSelection";
import { homeSports, tabs, timeFilters, matches } from "@/data/homeData";
import SportsSubNav from "@/components/SportsSubNav";
import Breadcrumb from "@/components/Breadcrumb";
import TabsBar from "@/components/TabsBar";
import PillTabs from "@/components/PillTabs";
import CompetitionHeader from "@/components/CompetitionHeader";
import MatchCard from "@/components/MatchCard";
import { StarIcon } from "@/components/icons";
import type { Match } from "@/types";

type Props = {};

function HomePage({}: Props) {
  const { eventNavigation } = useEvent();
  const { isLoading, isError } = eventNavigation;
  const navigate = useNavigate();

  const {
    activeTab,
    setActiveTab,
    activeFilter,
    setActiveFilter,
    sectionOpen,
    setSectionOpen,
  } = useHomeFilters();
  const { selectedOdd, toggleOdd } = useOddSelection();

  const handleSelectMatch = (match: Match) => {
    navigate(`/event/${match.id}`);
  };

  if (isLoading) return <div>Loading…</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans text-sm">
      <SportsSubNav sports={homeSports} showAllButton />
      <Breadcrumb items={[{ label: "Home" }]} current="Rugby Union" />

      <div className="px-6">
        <div className="bg-white w-full px-4 py-5 mb-4 rounded-md border border-gray-200">
          <div className="flex items-center gap-2 mb-1.5">
            <h1 className="text-xl font-bold text-gray-900">Rugby Union</h1>
            <StarIcon className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed max-w-xl">
            Trade and bet on a variety of rugby betting markets, including those
            on the Six Nations and Aviva Premiership.
          </p>
        </div>
      </div>

      <TabsBar items={tabs} active={activeTab} onChange={setActiveTab} />

      <PillTabs
        items={timeFilters}
        active={activeFilter}
        onChange={setActiveFilter}
        className="px-4 sm:px-6 py-3"
      />

      <CompetitionHeader
        title="National Provincial Championship"
        count={7}
        open={sectionOpen}
        onToggle={() => setSectionOpen((v) => !v)}
      />

      {sectionOpen && (
        <div className="mx-4 sm:mx-6 mb-6">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              selectedOdd={selectedOdd}
              onToggleOdd={toggleOdd}
              onSelect={handleSelectMatch}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
