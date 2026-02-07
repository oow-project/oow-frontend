import { api } from "./client";
import { API_DEFAULTS } from "../constants/api";
import type {
  HeroListResponse,
  HeroRole,
  HeroDetailResponse,
  StatsResponse,
  StatsFilters,
} from "../types/hero";

export const fetchHeroes = async (role?: HeroRole): Promise<HeroListResponse> => {
  const searchParams: Record<string, string> = {};

  if (role) {
    searchParams.role = role;
  }

  return api.get("api/heroes", { searchParams }).json<HeroListResponse>();
};

export const fetchHeroDetail = async (heroKey: string): Promise<HeroDetailResponse> => {
  return api.get(`api/heroes/${heroKey}`).json<HeroDetailResponse>();
};

export const fetchHeroStats = async (
  filters: Partial<StatsFilters> = {},
): Promise<StatsResponse> => {
  const searchParams: Record<string, string> = {
    platform: API_DEFAULTS.platform,
    gamemode: API_DEFAULTS.gamemode,
  };

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined) {
      searchParams[key] = value;
    }
  }

  return api.get("api/heroes/stats", { searchParams }).json<StatsResponse>();
};
