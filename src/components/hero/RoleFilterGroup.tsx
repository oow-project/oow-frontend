import { Button } from "../ui/Button";
import { ROLE_FILTER_OPTIONS } from "../../constants/hero";

interface RoleFilterGroupProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

export const RoleFilterGroup = ({ selectedRole, onRoleChange }: RoleFilterGroupProps) => (
  <div className="flex gap-2">
    {ROLE_FILTER_OPTIONS.map((filter) => (
      <Button
        key={filter.value ?? "all"}
        variant={selectedRole === (filter.value ?? "all") ? "primary" : "secondary"}
        size="md"
        onClick={() => onRoleChange(filter.value ?? "all")}
        className="rounded-lg"
      >
        {filter.label}
      </Button>
    ))}
  </div>
);
