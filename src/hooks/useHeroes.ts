import { useQuery } from "@tanstack/react-query";
import { fetchHeroes } from "../api/heroes";

export const useHeroes = () => {
  return useQuery({
    queryKey: ["heroes"],
    queryFn: () => fetchHeroes(),
  });
};
