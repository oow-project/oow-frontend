import { useState } from "react";
import { StatsFilter } from "../components/StatsFilter";
import { StatsTable } from "../components/StatsTable";
import { DEFAULT_FILTERS } from "../constants/filters";
import { useHeroStats } from "../hooks/useHeroes";

import type { SortKey, SortOrder, StatsFilters } from "../types/hero";

const DEFAULT_SORT_KEY: SortKey = "pickrate";
const DEFAULT_SORT_ORDER: SortOrder = "desc";

export const HeroesStats = () => {
  const [filters, setFilters] = useState<StatsFilters>(DEFAULT_FILTERS);
  const [sortKey, setSortKey] = useState<SortKey>(DEFAULT_SORT_KEY);
  const [sortOrder, setSortOrder] = useState<SortOrder>(DEFAULT_SORT_ORDER);
  const { data, isLoading, isError } = useHeroStats(filters);

  const handleFilterChange = (key: keyof StatsFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  const sortedStats = data?.stats.toSorted((a, b) => {
    const modifier = sortOrder === "desc" ? -1 : 1;
    return (a[sortKey] - b[sortKey]) * modifier;
  });

  return (
    <>
      <h1 className="mb-6 text-xl font-bold text-oow-white">영웅 통계</h1>
      <StatsFilter filters={filters} onFilterChange={handleFilterChange} />
      <div className="mt-6">
        <StatsTable
          stats={sortedStats ?? []}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </>
  );
};
