import { Link } from "react-router";

import type { HeroStatItem } from "../../types/hero";
import { useChatStore } from "../../stores/chatStore";
import { ROLE_ICONS, ROLE_LABELS } from "../../constants/hero";
import { ROUTES } from "../../constants/routes";
import { STATS_LABELS } from "../../constants/messages";
import { Button } from "../ui/Button";

interface StatsTableRowProps {
  hero: HeroStatItem;
  rank: number;
}

export const StatsTableRow = ({ hero, rank }: StatsTableRowProps) => {
  const RoleIcon = ROLE_ICONS[hero.role];
  const openAISidePanel = useChatStore((state) => state.openAISidePanel);
  const setAnalysisCard = useChatStore((state) => state.setAnalysisCard);

  const handleAnalysisClick = () => {
    setAnalysisCard({
      heroKey: hero.key,
      heroName: hero.name,
      heroRole: hero.role,
      winrate: hero.winrate,
      pickrate: hero.pickrate,
    });
    openAISidePanel();
  };

  return (
    <tr className="bg-oow-navy-700 hover:bg-oow-gray">
      <td className="border-b border-oow-navy-600 px-4 py-2 text-sm text-oow-white">{rank}</td>
      <td className="border-b border-oow-navy-600 px-4 py-2 text-sm text-oow-white">
        <Link to={ROUTES.heroDetailPath(hero.key)} className="flex items-center gap-2">
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
        <Button
          variant="secondary"
          size="md"
          onClick={handleAnalysisClick}
          className="rounded-lg text-xs text-oow-gray hover:bg-oow-orange"
        >
          {STATS_LABELS.ANALYSIS}
        </Button>
      </td>
    </tr>
  );
};
