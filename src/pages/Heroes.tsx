import { useState } from "react";
import { HeroCard } from "../components/HeroCard";
import { useHeroes } from "../hooks/useHeroes";

import type { HeroRole } from "../types/hero";

const ROLE_FILTERS: Array<{ value: HeroRole | null; label: string }> = [
  { value: null, label: "전체" },
  { value: "tank", label: "탱커" },
  { value: "damage", label: "딜러" },
  { value: "support", label: "힐러" },
];

export const Heroes = () => {
  const [selectedRole, setSelectedRole] = useState<HeroRole | null>(null);
  const { data, isLoading, isError } = useHeroes();

  const filteredHeroes = selectedRole
    ? data?.heroes.filter((hero) => hero.role === selectedRole)
    : data?.heroes;

  if (isError) {
    return <p className="p-4 text-oow-orange md:p-6">영웅 정보를 불러오는데 실패했습니다.</p>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-oow-navy-600 border-t-oow-orange" />
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-6 text-xl font-bold text-oow-white">영웅 정보</h1>
      <div className="mb-6 flex gap-2">
        {ROLE_FILTERS.map((filter) => (
          <button
            key={filter.label}
            type="button"
            onClick={() => setSelectedRole(filter.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              selectedRole === filter.value
                ? "bg-oow-orange text-oow-white"
                : "bg-oow-navy-600 text-oow-gray"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 ">
        {filteredHeroes?.map((hero) => (
          <HeroCard key={hero.key} hero={hero} />
        ))}
      </div>
    </>
  );
};
