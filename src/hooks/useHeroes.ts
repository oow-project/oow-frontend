import { useQuery } from "@tanstack/react-query";
import { fetchHeroDetail, fetchHeroes } from "../api/heroes";

export const useHeroes = () => {
  return useQuery({
    queryKey: ["heroes"],
    queryFn: () => fetchHeroes(),
  });
};

export const useHeroDetail = (heroKey: string) => {
  return useQuery({
    queryKey: ["hero", heroKey],
    queryFn: () => fetchHeroDetail(heroKey),
  });
};
