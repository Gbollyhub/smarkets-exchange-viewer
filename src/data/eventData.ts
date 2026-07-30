import {
  TrophyIcon,
  LifebuoyIcon,
  CircleStackIcon,
  TvIcon,
  GlobeAltIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";
import type { MarketOddsRow, Sport } from "@/types";

export const eventSports: Sport[] = [
  { name: "Rugby Union", icon: TrophyIcon, active: true },
  { name: "Sailing", icon: LifebuoyIcon },
  { name: "Snooker", icon: CircleStackIcon },
  { name: "TV and Specials", icon: TvIcon },
  { name: "Table Tennis", icon: GlobeAltIcon },
  { name: "Volley", icon: GlobeAmericasIcon },
];

export const marketTabs = ["All"];

export const mainOdds: MarketOddsRow[] = [
  { contract: "Waikato", buy: 1.99, sell: 2.38 },
  { contract: "Draw", buy: 25, sell: 10000 },
  { contract: "Bay of Plenty", buy: 1.78, sell: 2.1 },
];

export const drawNoBet: MarketOddsRow[] = [
  { contract: "Waikato", buy: 1.95, sell: 2.44 },
  { contract: "Bay of Plenty", buy: 1.69, sell: 2.06 },
];

export const htftLeft: MarketOddsRow[] = [
  { contract: "Waikato / Waikato", buy: 2.74, sell: 3.6 },
  { contract: "Waikato / Bay of Plenty", buy: 6.2, sell: 9.4 },
  { contract: "Waikato / Draw", buy: 50, sell: 10000 },
  { contract: "Bay of Plenty / Waikato", buy: 7.0, sell: 11.5 },
  { contract: "Bay of Plenty / Bay of Plenty", buy: 2.36, sell: 3.05 },
];

export const htftRight: MarketOddsRow[] = [
  { contract: "Bay of Plenty / Draw", buy: 50, sell: 10000 },
  { contract: "Draw / Waikato", buy: 34, sell: 1000 },
  { contract: "Draw / Bay of Plenty", buy: 30, sell: 260 },
  { contract: "Draw / Draw", buy: 130, sell: 10000 },
];
