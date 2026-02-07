import { FilterDropdown } from "./FilterDropdown";
import type { StatsFilters } from "../../types/hero";
import { ROLE_FILTER_OPTIONS } from "../../constants/hero";

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

interface StatsFilterProps {
  filters: StatsFilters;
  onFilterChange: (key: keyof StatsFilters, value: string) => void;
}

export const StatsFilter = ({ filters, onFilterChange }: StatsFilterProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {ROLE_FILTER_OPTIONS.map((filter) => (
            <button
              key={filter.value ?? "all"}
              type="button"
              onClick={() => onFilterChange("role", filter.value ?? "all")}
              className={`rounded-lg px-4 py-2 text-sm font-medium cursor-pointer ${
                filters.role === (filter.value ?? "all")
                  ? "bg-oow-orange text-oow-white"
                  : "bg-oow-navy-600 text-oow-gray hover:opacity-70"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <FilterDropdown
            value={filters.region}
            options={REGION_OPTIONS}
            onValueChange={(value) => onFilterChange("region", value)}
          />
          <FilterDropdown
            value={filters.competitiveDivision}
            options={DIVISION_OPTIONS}
            onValueChange={(value) => onFilterChange("competitiveDivision", value)}
          />
        </div>
      </div>
    </div>
  );
};
