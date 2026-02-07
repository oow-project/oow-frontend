import { useQuery } from "@tanstack/react-query";
import { fetchHeroDetail, fetchHeroes, fetchHeroStats } from "../api/heroes";
import { QUERY_KEYS } from "../constants/queryKeys";

import type { StatsFilters } from "../types/hero";

export const useHeroes = () => {
  return useQuery({
    queryKey: QUERY_KEYS.heroes,
    queryFn: () => fetchHeroes(),
  });
};

export const useHeroDetail = (heroKey: string | undefined) => {
  return useQuery({
    queryKey: QUERY_KEYS.hero(heroKey!),
    queryFn: () => fetchHeroDetail(heroKey!),
    enabled: !!heroKey,
  });
};

export const useHeroStats = (filters: Partial<StatsFilters> = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.heroStats(filters),
    queryFn: () => fetchHeroStats(filters),
  });
};
