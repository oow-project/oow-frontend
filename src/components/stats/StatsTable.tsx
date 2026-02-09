import { ChevronDown, ChevronUp } from "lucide-react";
import { StatsTableRow } from "./StatsTableRow";
import { Spinner } from "../ui/Spinner";
import { ErrorMessage } from "../ui/ErrorMessage";
import { STATS_LABELS } from "../../constants/messages";

import type { HeroStatItem, SortKey, SortOrder } from "../../types/hero";

interface StatsTableProps {
  stats: HeroStatItem[];
  sortKey: SortKey;
  sortOrder: SortOrder;
  onSortChange: (key: SortKey) => void;
  isLoading: boolean;
  isError: boolean;
}

export const StatsTable = ({
  stats,
  sortKey,
  sortOrder,
  onSortChange,
  isLoading,
  isError,
}: StatsTableProps) => {
  if (isLoading) return <Spinner />;
  if (isError)
    return <ErrorMessage message="통계를 불러오는데 실패했습니다." className="py-20 text-center" />;

  const SortIcon = sortOrder === "desc" ? ChevronDown : ChevronUp;

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-oow-navy-800">
          <th className="border-b border-oow-navy-600 px-2 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-oow-gray">
            <span className="hidden md:inline">순위</span>
          </th>
          <th className="border-b border-oow-navy-600 px-2 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-oow-gray">
            <span className="hidden md:inline">영웅</span>
          </th>
          <th className="hidden md:table-cell border-b border-oow-navy-600 px-4 py-2 text-left text-sm font-medium text-oow-gray whitespace-nowrap">
            포지션
          </th>
          <th
            className="cursor-pointer whitespace-nowrap border-b border-oow-navy-600 px-2 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-oow-gray"
            onClick={() => onSortChange("winrate")}
          >
            <span className="inline-flex items-center gap-0.5 md:gap-1">
              승률
              {sortKey === "winrate" ? <SortIcon className="h-3 w-3 md:h-4 md:w-4" /> : null}
            </span>
          </th>
          <th
            className="whitespace-nowrap cursor-pointer border-b border-oow-navy-600 px-2 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-oow-gray"
            onClick={() => onSortChange("pickrate")}
          >
            <span className="inline-flex items-center gap-0.5 md:gap-1">
              픽률
              {sortKey === "pickrate" ? <SortIcon className="h-3 w-3 md:h-4 md:w-4" /> : null}
            </span>
          </th>
          <th className="border-b border-oow-navy-600 px-2 md:px-4 py-2 text-center md:text-left text-xs md:text-sm font-medium text-oow-gray">
            {STATS_LABELS.ANALYSIS}
          </th>
        </tr>
      </thead>
      <tbody>
        {stats.map((hero, index) => (
          <StatsTableRow key={hero.key} hero={hero} rank={index + 1} />
        ))}
      </tbody>
    </table>
  );
};
