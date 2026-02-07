import type { ChangeEvent } from "react";

interface FilterDropdownProps {
  value: string;
  options: Array<{ value: string; label: string }>;
  onValueChange: (value: string) => void;
}

export const FilterDropdown = ({ value, options, onValueChange }: FilterDropdownProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onValueChange(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="rounded-lg bg-oow-navy-600 px-4 py-2 text-sm font-medium text-oow-white outline-none"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
