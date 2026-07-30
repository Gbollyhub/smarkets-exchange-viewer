import { useState } from "react"

const sports = [
  { name: "Rugby Union", icon: "🏉", active: true },
  { name: "Sailing", icon: "⛵" },
  { name: "Snooker", icon: "🎱" },
  { name: "TV and Specials", icon: "📺" },
  { name: "Table Tennis", icon: "🏓" },
  { name: "Volleyball", icon: "🏐" },
]

const tabs = ["Upcoming", "Competitions", "Futures"]
const timeFilters = ["Tomorrow", "This week"]

const matches = [
  {
    id: 1,
    home: "Waikato",
    away: "Bay of Plenty",
    time: "Tomorrow at 08:10",
    country: "New Zealand",
    odds: {
      home:  { label: "Waikato",       values: [1.99, 2.38] },
      draw:  { label: "Draw",          values: [25, 10000] },
      away:  { label: "Bay of Plenty", values: [1.78, 2.10] },
    },
  },
]

export default function App() {
  const [activeTab, setActiveTab] = useState("Upcoming")
  const [activeFilter, setActiveFilter] = useState("Tomorrow")
  const [sectionOpen, setSectionOpen] = useState(true)

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans text-sm">

      {/* ── Top Navigation ── */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center h-11 px-3 gap-1 overflow-x-auto scrollbar-hide">
          <button className="flex-shrink-0 p-1.5 text-gray-600 hover:bg-gray-100 rounded">
            <HamburgerIcon />
          </button>
          <button className="flex-shrink-0 p-1.5 text-gray-500 hover:bg-gray-100 rounded">
            <ChevronLeftIcon />
          </button>

          <div className="flex items-center gap-0 flex-1 overflow-x-auto scrollbar-hide">
            <button className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded whitespace-nowrap">
              All
            </button>
            {sports.map((sport) => (
              <button
                key={sport.name}
                className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                  sport.active ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-sm leading-none">{sport.icon}</span>
                <span>{sport.name}</span>
                <StarIcon className="w-3 h-3 text-gray-400" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 rounded hover:bg-gray-50 whitespace-nowrap">
              <ProfitIcon />
              Profit Hub
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 rounded hover:bg-gray-50 whitespace-nowrap">
              <PortfolioIcon />
              Portfolio
            </button>
          </div>
        </div>
      </nav>

      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 text-xs text-gray-500">
        <span className="hover:text-gray-700 cursor-pointer">Home</span>
        <ChevronRightSmall />
        <span className="text-gray-700">Rugby Union</span>
      </div>

      {/* ── Rugby Union Header — full-width white strip ── */}
      <div className="bg-white w-full px-4 sm:px-6 py-5 mb-4">
        <div className="flex items-center gap-2 mb-1.5">
          <h1 className="text-xl font-bold text-gray-900">Rugby Union</h1>
          <StarIcon className="w-4 h-4 text-gray-400" />
        </div>
        <p className="text-xs text-gray-500 leading-relaxed max-w-xl">
          Trade and bet on a variety of rugby betting markets, including those on the Six Nations and Aviva Premiership.
        </p>
      </div>

      {/* ── Tabs — no background card ── */}
      <div className="flex border-b border-gray-300 px-4 sm:px-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === tab
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Time filters — no background card ── */}
      <div className="flex gap-2 px-4 sm:px-6 py-3">
        {timeFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeFilter === filter
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* ── Competition section header — no background card ── */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">
            National Provincial Championship
          </span>
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-300 text-xs font-medium text-gray-700">
            7
          </span>
          <StarIcon className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-yellow-400 transition-colors" />
        </div>
        <div className="flex items-center gap-3">
          <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
            See all
          </button>
          <button
            onClick={() => setSectionOpen((v) => !v)}
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            <ChevronUpIcon
              className={`w-4 h-4 transition-transform duration-200 ${sectionOpen ? "" : "rotate-180"}`}
            />
          </button>
        </div>
      </div>

      {/* ── Match card ── */}
      {sectionOpen && (
        <div className="mx-4 sm:mx-6 mb-6">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-white rounded-md border border-gray-200 overflow-hidden"
            >
              <div className="flex items-stretch">
                {/* Left: team names + match info */}
                <div className="flex-1 px-4 py-3 min-w-0">
                  <div className="text-sm font-medium text-gray-900 leading-snug">
                    {match.home}
                  </div>
                  <div className="text-sm font-medium text-gray-900 leading-snug mb-2">
                    {match.away}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <ClockIcon className="w-3 h-3 flex-shrink-0" />
                    <span>{match.time}</span>
                    <span>•</span>
                    <span>{match.country}</span>
                  </div>
                </div>

                {/* Right: odds columns */}
                <div className="flex divide-x divide-gray-100 border-l border-gray-100">
                  {Object.values(match.odds).map((col) => (
                    <div
                      key={col.label}
                      className="flex flex-col items-center justify-center px-3 sm:px-5 py-3 gap-2 min-w-[72px] sm:min-w-[90px]"
                    >
                      {/* Column label */}
                      <span className="text-[11px] text-gray-500 font-medium whitespace-nowrap">
                        {col.label}
                      </span>
                      {/* Two odds values side by side */}
                      <div className="flex gap-3">
                        {col.values.map((val, i) => (
                          <button
                            key={i}
                            className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Icons ── */

function HamburgerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="4"    width="12" height="1.5" rx="0.75" fill="currentColor" />
      <rect x="2" y="7.25" width="12" height="1.5" rx="0.75" fill="currentColor" />
      <rect x="2" y="10.5" width="12" height="1.5" rx="0.75" fill="currentColor" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRightSmall() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M4 9l3-3-3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 2l1.545 3.13L13 5.635l-2.5 2.435.59 3.44L8 9.885l-3.09 1.625.59-3.44L3 5.635l3.455-.505L8 2z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1" />
      <path d="M6 3.5V6l1.5 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

function ProfitIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1"   y="5" width="3" height="7" rx="0.5" fill="currentColor" opacity="0.4" />
      <rect x="5.5" y="3" width="3" height="9" rx="0.5" fill="currentColor" opacity="0.6" />
      <rect x="10"  y="1" width="3" height="11" rx="0.5" fill="currentColor" />
    </svg>
  )
}

function PortfolioIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
      <path d="M4.5 4V3a1 1 0 011-1h3a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1" />
      <path d="M1 7.5h12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}
