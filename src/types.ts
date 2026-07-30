import type { ComponentType, SVGProps } from "react";

export type AuthResponse = {
  token: string;
  stop: string;
  factor: string;
  verify: boolean;
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
