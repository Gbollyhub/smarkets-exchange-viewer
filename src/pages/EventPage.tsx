import { useNavigate } from "react-router-dom";
import { useEventFilters } from "@/hooks/useEventFilters";
import { useOddSelection } from "@/hooks/useOddSelection";
import {
  marketTabs,
  mainOdds,
  drawNoBet,
  htftLeft,
  htftRight,
  eventSports,
} from "@/data/eventData";
import SportsSubNav from "@/components/SportsSubNav";
import Breadcrumb from "@/components/Breadcrumb";
import EventSummaryCard from "@/components/EventSummaryCard";
import PillTabs from "@/components/PillTabs";
import MarketSection from "@/components/MarketSection";
import OddsTableHeader from "@/components/OddsTableHeader";
import OddsRow from "@/components/OddsRow";

type Props = {};

export default function EventPage({}: Props) {
  const navigate = useNavigate();
  const {
    activeMarket,
    setActiveMarket,
    graphView,
    setGraphView,
    dnbOpen,
    setDnbOpen,
    htftOpen,
    setHtftOpen,
  } = useEventFilters();
  const { selectedOdd, toggleOdd } = useOddSelection();

  const goToHome = () => navigate("/");

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans text-sm">
      <SportsSubNav sports={eventSports} onBack={() => navigate(-1)} showMoreIndicator />

      <Breadcrumb
        items={[
          { label: "Home" },
          { label: "Rugby Union", onClick: goToHome },
          { label: "National Provincial Championship" },
        ]}
        current="Waikato vs Bay of Plenty"
        wrap
      />

      <EventSummaryCard
        homeTeam="Waikato"
        awayTeam="Bay of Plenty"
        kickoff="Today at 08:10"
        venue="FMG Stadium Waikato"
        graphView={graphView}
        onGraphViewChange={setGraphView}
        odds={mainOdds}
        selectedOdd={selectedOdd}
        onToggleOdd={toggleOdd}
      />

      {/* ── Market filter tabs ── */}
      <PillTabs
        items={marketTabs}
        active={activeMarket}
        onChange={setActiveMarket}
        size="md"
        className="px-4 sm:px-6 mb-4"
      />

      {/* ── Draw no bet section ── */}
      <MarketSection title="Draw no bet" open={dnbOpen} onToggle={() => setDnbOpen((v) => !v)}>
        <div className="border-t border-gray-100">
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <OddsTableHeader />
            <OddsTableHeader firstColumnLabel="" />
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-100 hover:bg-gray-50 transition-colors">
            {drawNoBet.map((row) => (
              <OddsRow
                key={row.contract}
                row={row}
                idPrefix={`dnb-${row.contract}`}
                selectedOdd={selectedOdd}
                onToggleOdd={toggleOdd}
                className="py-3"
              />
            ))}
          </div>
        </div>
      </MarketSection>

      {/* ── Half-time / full-time section ── */}
      <MarketSection
        title="Half-time/full-time"
        open={htftOpen}
        onToggle={() => setHtftOpen((v) => !v)}
      >
        <div className="border-t border-gray-100">
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <OddsTableHeader />
            <OddsTableHeader firstColumnLabel="" />
          </div>

          {Array.from({ length: Math.max(htftLeft.length, htftRight.length) }).map((_, i) => {
            const left = htftLeft[i];
            const right = htftRight[i];
            return (
              <div
                key={i}
                className="grid grid-cols-2 divide-x divide-gray-100 border-t border-gray-50 hover:bg-gray-50 transition-colors"
              >
                {left ? (
                  <OddsRow
                    row={left}
                    idPrefix={`htft-L${i}`}
                    selectedOdd={selectedOdd}
                    onToggleOdd={toggleOdd}
                    className="py-2.5"
                  />
                ) : (
                  <div />
                )}
                {right ? (
                  <OddsRow
                    row={right}
                    idPrefix={`htft-R${i}`}
                    selectedOdd={selectedOdd}
                    onToggleOdd={toggleOdd}
                    className="py-2.5"
                  />
                ) : (
                  <div />
                )}
              </div>
            );
          })}
        </div>
      </MarketSection>

      <div className="h-8" />
    </div>
  );
}
