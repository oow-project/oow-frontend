import type { HeroListResponse, HeroRole } from "../types/hero";
import { api } from "./client";

export const fetchHeroes = async (role?: HeroRole): Promise<HeroListResponse> => {
  const searchParams: Record<string, string> = {};

  if (role) {
    searchParams.role = role;
  }

  return api.get("api/heroes", { searchParams }).json<HeroListResponse>();
};
