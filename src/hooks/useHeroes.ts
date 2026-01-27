import { useQuery } from "@tanstack/react-query";
import { fetchHeroDetail, fetchHeroes, fetchHeroStats } from "../api/heroes";

import type { StatsFilters } from "../types/hero";

export const useHeroes = () => {
  return useQuery({
    queryKey: ["heroes"],
    queryFn: () => fetchHeroes(),
  });
};

export const useHeroDetail = (heroKey: string | undefined) => {
  return useQuery({
    queryKey: ["hero", heroKey],
    queryFn: () => fetchHeroDetail(heroKey!),
    enabled: !!heroKey,
  });
};

export const useHeroStats = (filters: Partial<StatsFilters> = {}) => {
  return useQuery({
    queryKey: ["heroStats", filters],
    queryFn: () => fetchHeroStats(filters),
  });
};
