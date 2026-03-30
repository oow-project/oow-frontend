import { Button } from "../ui/Button";
import { ROLE_FILTER_OPTIONS } from "../../constants/hero";

interface RoleFilterGroupProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

export const RoleFilterGroup = ({ selectedRole, onRoleChange }: RoleFilterGroupProps) => (
  <div className="flex shrink-0 gap-1 xs:gap-1 md:gap-2">
    {ROLE_FILTER_OPTIONS.map((filter) => (
      <Button
        key={filter.value ?? "all"}
        variant={selectedRole === (filter.value ?? "all") ? "primary" : "secondary"}
        size="sm"
        onClick={() => onRoleChange(filter.value ?? "all")}
        className="rounded-lg"
      >
        {filter.label}
      </Button>
    ))}
  </div>
);
