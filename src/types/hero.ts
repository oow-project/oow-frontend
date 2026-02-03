export type HeroRole = "tank" | "damage" | "support";
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
export type AbilityType = "skill" | "perk_major" | "perk_minor";

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
  abilityType: AbilityType;
}

export interface GroupedAbilities {
  skill: Ability[];
  perkMajor: Ability[];
  perkMinor: Ability[];
}

export interface Hitpoints {
  health: number;
  armor: number;
  shields: number;
  total: number;
}

export interface HeroDetailResponse extends Hero {
  hitpoints: Hitpoints;
  abilities: GroupedAbilities;
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
  region: Region;
  competitiveDivision: CompetitiveDivision;
  role: HeroRoleFilter;
}

export interface StatsResponse {
  stats: HeroStatItem[];
  filters: StatsFilters;
  total: number;
  syncedAt: string | null;
}

export type SortKey = "winrate" | "pickrate";
export type SortOrder = "asc" | "desc";
