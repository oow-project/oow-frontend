export type HeroRole = "tank" | "damage" | "support";
export type PerkType = "major" | "minor";
export type Platform = "pc" | "console";
export type Gamemode = "competitive" | "quickplay";
export type Region = "asia" | "europe" | "americas";
export type CompetitiveDivision =
  | "all"
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "diamond"
  | "master"
  | "grandmaster";
export type HeroRoleFilter = "all" | HeroRole;

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

export interface Ability {
  name: string;
  description: string;
  icon: string;
}

export interface Perk {
  name: string;
  description: string;
  icon: string;
  type: PerkType;
}

export interface Hitpoints {
  health: number;
  armor: number;
  shields: number;
  total: number;
}

export interface HeroDetailResponse extends Hero {
  hitpoints: Hitpoints;
  abilities: Ability[];
  perks: Perk[];
  counters: Hero[];
  synergies: Hero[];
}

export interface SkillRow {
  name: string;
  description: string;
  icon: string;
}

export interface HeroStatItem extends Hero {
  winrate: number;
  pickrate: number;
}

export interface StatsFilters {
  platform: Platform;
  gamemode: Gamemode;
  region: Region;
  competitive_division: CompetitiveDivision;
  role: HeroRoleFilter;
}

export interface StatsResponse {
  stats: HeroStatItem[];
  filters: StatsFilters;
  total: number;
  synced_at: string | null;
}
