import { Plus, Shield, Sword } from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { HeroRole } from "../types/hero";

export const ROLE_LABELS: Record<HeroRole, string> = {
  tank: "탱커",
  damage: "딜러",
  support: "힐러",
};

export const ROLE_FILTER_OPTIONS: Array<{ value: HeroRole | null; label: string }> = [
  { value: null, label: "전체" },
  { value: "tank", label: "탱커" },
  { value: "damage", label: "딜러" },
  { value: "support", label: "힐러" },
];

export const ROLE_ICONS: Record<HeroRole, LucideIcon> = {
  tank: Shield,
  damage: Sword,
  support: Plus,
};
