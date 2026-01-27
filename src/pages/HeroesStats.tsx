import { useState } from "react";
import { StatsFilter } from "../components/StatsFilter";
import { DEFAULT_FILTERS } from "../constants/filters";

import type { StatsFilters } from "../types/hero";

export const HeroesStats = () => {
  const [filters, setFilters] = useState<StatsFilters>(DEFAULT_FILTERS);

  const handleFilterChange = (key: keyof StatsFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <h1 className="mb-6 text-xl font-bold text-oow-white">영웅 통계</h1>
      <StatsFilter filters={filters} onFilterChange={handleFilterChange} />
    </>
  );
};
