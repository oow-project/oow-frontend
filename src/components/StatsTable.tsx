import { ChevronDown, ChevronUp } from "lucide-react";
import { StatsTableRow } from "./StatsTableRow";

import type { HeroStatItem, SortKey, SortOrder } from "../types/hero";

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
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-oow-navy-600 border-t-oow-orange" />
      </div>
    );
  }

  if (isError) {
    return <p className="py-20 text-center text-oow-orange">통계를 불러오는데 실패했습니다.</p>;
  }

  const SortIcon = sortOrder === "desc" ? ChevronDown : ChevronUp;

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-oow-navy-800">
          <th className="border-b border-oow-navy-600 px-4 py-2 text-left text-sm font-medium text-oow-gray">
            <span className="hidden md:inline">순위</span>
          </th>
          <th className="border-b border-oow-navy-600 px-4 py-2 text-left text-sm font-medium text-oow-gray">
            <span className="hidden md:inline">영웅</span>
          </th>
          <th className="border-b border-oow-navy-600 px-4 py-2 text-left text-sm font-medium text-oow-gray whitespace-nowrap">
            포지션
          </th>
          <th
            className="cursor-pointer whitespace-nowrap border-b border-oow-navy-600 px-4 py-2 text-left text-sm font-medium text-oow-gray"
            onClick={() => onSortChange("winrate")}
          >
            <span className="inline-flex items-center gap-1">
              승률
              {sortKey === "winrate" ? <SortIcon className="h-4 w-4" /> : null}
            </span>
          </th>
          <th
            className=" whitespace-nowrap cursor-pointer border-b border-oow-navy-600 px-4 py-2 text-left text-sm font-medium text-oow-gray"
            onClick={() => onSortChange("pickrate")}
          >
            <span className="inline-flex items-center gap-1">
              픽률
              {sortKey === "pickrate" ? <SortIcon className="h-4 w-4" /> : null}
            </span>
          </th>
          <th className="border-b border-oow-navy-600 px-4 py-2 text-left text-sm font-medium text-oow-gray">
            분석
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
