import { Link } from "react-router";
import { Plus, Shield, Sword } from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { HeroRole, HeroStatItem } from "../types/hero";

const ROLE_ICONS: Record<HeroRole, LucideIcon> = {
  tank: Shield,
  damage: Sword,
  support: Plus,
};

const ROLE_LABELS: Record<HeroRole, string> = {
  tank: "탱커",
  damage: "딜러",
  support: "힐러",
};

interface StatsTableRowProps {
  hero: HeroStatItem;
  rank: number;
}

export const StatsTableRow = ({ hero, rank }: StatsTableRowProps) => {
  const RoleIcon = ROLE_ICONS[hero.role];

  return (
    <tr className="bg-oow-navy-700">
      <td className="border-b border-oow-navy-600 px-4 py-2 text-sm text-oow-white">{rank}</td>
      <td className="border-b border-oow-navy-600 px-4 py-2 text-sm text-oow-white">
        <Link to={`/heroes/${hero.key}`} className="flex items-center gap-2">
          <img src={hero.portrait} alt={hero.name} className="h-10 w-10 md:h-16 md:w-16" />
          <span className="text-sm whitespace-nowrap font-medium">{hero.name}</span>
        </Link>
      </td>

      <td className="border-b border-oow-navy-600 px-4 py-2 text-sm text-oow-white">
        <div className="flex items-center gap-1 whitespace-nowrap">
          <RoleIcon className="h-4 w-4 hidden md:inline" />
          <span>{ROLE_LABELS[hero.role]}</span>
        </div>
      </td>
      <td className="border-b border-oow-navy-600 px-4 py-2 text-sm text-oow-white">
        {hero.winrate}%
      </td>
      <td className="border-b border-oow-navy-600 px-4 py-2 text-sm text-oow-white">
        {hero.pickrate}%
      </td>
      <td className="border-b border-oow-navy-600 px-4 py-2 text-sm">
        <button
          type="button"
          className="rounded-lg bg-oow-navy-600 px-3 py-2 text-xs font-medium text-oow-gray whitespace-nowrap"
        >
          분석
        </button>
      </td>
    </tr>
  );
};
