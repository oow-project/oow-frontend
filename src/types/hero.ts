export type HeroRole = "tank" | "damage" | "support";

export interface Hero {
  key: string;
  name: string;
  portrait: string;
  role: HeroRole;
}

export interface HeroListResponse {
  heroes: Hero[];
  total: number;
}
