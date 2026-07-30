import {
  TrophyIcon,
  LifebuoyIcon,
  CircleStackIcon,
  TvIcon,
  GlobeAltIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";
import type { Match, Sport } from "@/types";

export const homeSports: Sport[] = [
  { name: "Rugby Union", icon: TrophyIcon, active: true },
  { name: "Sailing", icon: LifebuoyIcon },
  { name: "Snooker", icon: CircleStackIcon },
  { name: "TV and Specials", icon: TvIcon },
  { name: "Table Tennis", icon: GlobeAltIcon },
  { name: "Volleyball", icon: GlobeAmericasIcon },
];

export const tabs = ["Upcoming", "Competitions", "Futures"];
export const timeFilters = ["Tomorrow", "This week"];

export const matches: Match[] = [
  {
    id: 1,
    home: "Waikato",
    away: "Bay of Plenty",
    time: "Tomorrow at 08:10",
    country: "New Zealand",
    odds: {
      home: { label: "Waikato", values: [1.99, 2.38] },
      draw: { label: "Draw", values: [25, 10000] },
      away: { label: "Bay of Plenty", values: [1.78, 2.1] },
    },
  },
];
