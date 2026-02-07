import { Link } from "react-router";

import type { Hero } from "../../types/hero";
import { ROLE_ICONS } from "../../constants/hero";

interface HeroCardProps {
  hero: Hero;
}

export const HeroCard = ({ hero }: HeroCardProps) => {
  const RoleIcon = ROLE_ICONS[hero.role];

  return (
    <Link
      to={`/heroes/${hero.key}`}
      className="flex flex-col bg-oow-navy-600 cursor-pointer hover:bg-oow-gray"
    >
      <img src={hero.portrait} alt={hero.name} className="w-full" />
      <div className="flex items-center gap-1 px-3 py-3">
        <RoleIcon className="h-4 w-4 text-oow-white" />
        <span className="text-xs font-medium text-oow-white">{hero.name}</span>
      </div>
    </Link>
  );
};
