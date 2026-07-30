export type AuthResponse = {
  token: string;
  stop: string;
  factor: string;
  verify: boolean;
  refresh_token: string
};

export interface PopularEventIdsResponse {
  popular_event_ids: string[];
}

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
  type: string;        
  state: EventState;
  start_date: string;
  start_datetime: string;    
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

export interface EventsResponse {
  events: SmarketsEvent[];
}

export type MarketState =
  | "new" | "open" | "live" | "halted" | "settled" | "voided" | "unavailable";

export interface MarketType {
  name: string;             
  param?: string;
  params?: Record<string, string>;
}

export interface Market {
  id: string;
  event_id: string;
  name: string;   
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

export interface MarketsResponse {
  markets: Market[];
}

export type ContractOutcome = null | "winner" | "loser" | "void" | "deadheat" | "reduce";

export interface Contract {
  id: string;
  market_id: string;
  name: string;
  outcome: ContractOutcome;
}

export interface ContractsResponse {
  contracts: Contract[];
}

export interface Tick {
  price: number;              
  quantity: number; 
}

export interface Book {
  bids: Tick[];
  offers: Tick[];
}

export type QuotesResponse = Record<string, Book>;

export interface PricedContract {
  id: string;
  name: string;
  buy: number | undefined;  
  sell: number | undefined;
}