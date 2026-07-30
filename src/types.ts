import type { ComponentType, SVGProps } from "react";

export type AuthResponse = {
  token: string;
  stop: string;
  factor: string;
  verify: boolean;
  refresh_token: string
};

export interface UserProfile {
  authenticated: boolean;
  country: string;
  currency: string;
  email: string;
  family_name: string;
  given_name: string;
  id_slug: string;
  last_changed_terms: string;
  last_seen_terms: string;
  member_id: number;
  permitted_country: boolean;
  rate: string;
}

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface Sport {
  name: string;
  icon: IconComponent;
  active?: boolean;
}

export interface OddsValue {
  label: string;
  values: [number, number];
}

export interface MatchOdds {
  home: OddsValue;
  draw: OddsValue;
  away: OddsValue;
}

export interface Match {
  id: number;
  home: string;
  away: string;
  time: string;
  country: string;
  odds: MatchOdds;
}

export interface MarketOddsRow {
  contract: string;
  buy: number;
  sell: number;
}

/* ---------- Auth ---------- */

// POST /v0/sessions/  (login)
export interface LoginResponse {
  token: string;                 // access token, use in Authorization header
  refresh_token: string;         // exchanged at /v3/easy/refresh/ when access expires
  stop: string;                  // ISO expiry of the access token
  factor: "complete" | "totp" | "nemid";
  verify: boolean;
  created_social_member: boolean;
}

// POST /v3/easy/refresh/  (note: access token comes back as session_token here)
export interface RefreshResponse {
  session_token: string;         // the new access token
  refresh_token: string;         // rotated, store the new one
  session_type: "easy" | "regular";
}

// GET /v0/users/current/
export interface CurrentUser {
  authenticated: boolean;
  country: string;
  currency: string;
  email: string;
  given_name: string;
  family_name: string;
  member_id: number;
  id_slug: string;
  permitted_country: boolean;
  rate: string;
}

/* ---------- Navigation ---------- */

// GET /v0/navigation/  -> a flat dict keyed by node key
export interface NavNode {
  children: string[];            // keys of child nodes
  count: number;
  filter: Record<string, unknown>;
  full_slug: string;
  id: string | null;
  layout_path: string | null;
  title: string;
  url: string | null;            // present on period nodes, carries the v3/events query
}

export type NavigationResponse = Record<string, NavNode>;

/* ---------- Popular ---------- */

// GET /v3/popular/event_ids/
export interface PopularEventIdsResponse {
  popular_event_ids: string[];
}

/* ---------- Events ---------- */

export type EventState = "upcoming" | "live" | "ended" | "settled" | "suspended";

export interface Venue {
  name: string;
  neutral: boolean;
  capacity?: number;
  city?: string;
  country_code?: string;
  country_name?: string;
}

export interface SmarketsEvent {
  id: string;
  name: string;
  short_name: string | null;
  slug: string;
  full_slug: string;
  type: string;                  // "football_match", "tennis_match", "politics", etc.
  state: EventState;
  start_date: string;
  start_datetime: string;        // ISO
  end_date: string | null;
  parent_id: string;
  bet_allowed: boolean;
  bettable: boolean;
  inplay_enabled: boolean;
  hidden: boolean;
  display_order: number;
  description: string | null;
  seo_description: string | null;
  special_rules: string | null;
  super_sub_enabled: boolean;
  chart_time_period: string | null;
  venue: Venue | null;
  created: string;
  modified: string;
}

// GET /v3/events/{ids}/
export interface EventsResponse {
  events: SmarketsEvent[];
}

/* ---------- Markets ---------- */

export type MarketState =
  | "new" | "open" | "live" | "halted" | "settled" | "voided" | "unavailable";

export interface MarketType {
  name: string;                  // "OVER_UNDER", the reliable identifier
  param?: string;
  params?: Record<string, string>;
}

export interface Market {
  id: string;
  event_id: string;
  name: string;                  // display only, use market_type to identify
  slug: string;
  market_type: MarketType | null;
  category: string;
  categories: string[];
  state: MarketState;
  display_type: string;
  display_order: number | null;
  winner_count: number;
  bet_delay: number;
  cashout_enabled: boolean;
  complete: boolean;
  hidden: boolean;
  inplay_enabled: boolean;
  contract_selections: number[] | null;
  info: Record<string, unknown> | null;
  description: string | null;
  created: string;
  modified: string;
}

// GET /v3/events/{ids}/markets/
export interface MarketsResponse {
  markets: Market[];
}

/* ---------- Contracts ---------- */

export type ContractOutcome = null | "winner" | "loser" | "void" | "deadheat" | "reduce";

// verify field names against a live /v3/markets/{ids}/contracts/ call
export interface Contract {
  id: string;
  market_id: string;
  name: string;
  outcome: ContractOutcome;
}

export interface ContractsResponse {
  contracts: Contract[];
}

/* ---------- Quotes (prices) ---------- */

export interface Tick {
  price: number;                 // basis points, decimal odds = 10000 / price
  quantity: number;              // 1/100 of a penny
}

export interface Book {
  bids: Tick[];                  // sell / lay side
  offers: Tick[];                // buy / back side
}

// GET /v3/markets/{ids}/quotes/  -> keyed by id (confirm: contract id vs market id)
export type QuotesResponse = Record<string, Book>;

// view-model shapes the homepage builds for rendering
export interface PricedContract {
  id: string;
  name: string;
  buy: number | undefined;   // offers = back
  sell: number | undefined;  // bids = lay
}
