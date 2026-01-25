import { Plus, Shield, Sword } from "lucide-react";
import { Link } from "react-router";

import type { LucideIcon } from "lucide-react";
import type { Hero, HeroRole } from "../types/hero";

const ROLE_ICONS: Record<HeroRole, LucideIcon> = {
  tank: Shield,
  damage: Sword,
  support: Plus,
};

interface HeroCardProps {
  hero: Hero;
}

export const HeroCard = ({ hero }: HeroCardProps) => {
  const RoleIcon = ROLE_ICONS[hero.role];

  return (
    <Link to={`/heroes/${hero.key}`} className="flex flex-col bg-oow-navy-600">
      <img src={hero.portrait} alt={hero.name} className="w-full" />
      <div className="flex items-center gap-2 px-3 py-2">
        <RoleIcon className="h-4 w-4 text-oow-white" />
        <span className="text-sm font-medium text-oow-white">{hero.name}</span>
      </div>
    </Link>
  );
};
