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
