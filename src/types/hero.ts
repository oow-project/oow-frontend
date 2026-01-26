export type HeroRole = "tank" | "damage" | "support";

export type PerkType = "major" | "minor";

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
