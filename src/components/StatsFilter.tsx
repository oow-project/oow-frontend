import { FilterDropdown } from "../components/FilterDropdown";
import type { HeroRoleFilter, StatsFilters } from "../types/hero";

const REGION_OPTIONS = [
  { value: "asia", label: "아시아" },
  { value: "europe", label: "유럽" },
  { value: "americas", label: "아메리카" },
];

const DIVISION_OPTIONS = [
  { value: "all", label: "모든 티어" },
  { value: "bronze", label: "브론즈" },
  { value: "silver", label: "실버" },
  { value: "gold", label: "골드" },
  { value: "platinum", label: "플래티넘" },
  { value: "diamond", label: "다이아몬드" },
  { value: "master", label: "마스터" },
  { value: "grandmaster", label: "그랜드마스터" },
];

const GAMEMODE_OPTIONS = [
  { value: "competitive", label: "경쟁전" },
  { value: "quickplay", label: "빠른대전" },
];

const ROLE_FILTERS: Array<{ value: HeroRoleFilter; label: string }> = [
  { value: "all", label: "전체" },
  { value: "tank", label: "탱커" },
  { value: "damage", label: "딜러" },
  { value: "support", label: "힐러" },
];

interface StatsFilterProps {
  filters: StatsFilters;
  onFilterChange: (key: keyof StatsFilters, value: string) => void;
}

export const StatsFilter = ({ filters, onFilterChange }: StatsFilterProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <FilterDropdown
          value={filters.region}
          options={REGION_OPTIONS}
          onValueChange={(value) => onFilterChange("region", value)}
        />
        <FilterDropdown
          value={filters.competitive_division}
          options={DIVISION_OPTIONS}
          onValueChange={(value) => onFilterChange("competitive_division", value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {ROLE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => onFilterChange("role", filter.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                filters.role === filter.value
                  ? "bg-oow-orange text-oow-white"
                  : "bg-oow-navy-600 text-oow-gray"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <FilterDropdown
          value={filters.gamemode}
          options={GAMEMODE_OPTIONS}
          onValueChange={(value) => onFilterChange("gamemode", value)}
        />
      </div>
    </div>
  );
};
