import { useState } from "react";
import { HeroCard } from "../components/hero/HeroCard";
import { Spinner } from "../components/ui/Spinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { RoleFilterGroup } from "../components/hero/RoleFilterGroup";
import { useHeroes } from "../hooks/useHeroes";
import { HERO_MESSAGES, NAV_LABELS } from "../constants/messages";

import type { HeroRole } from "../types/hero";

export const Heroes = () => {
  const [selectedRole, setSelectedRole] = useState<HeroRole | null>(null);
  const { data, isLoading, isError } = useHeroes();

  const filteredHeroes = selectedRole
    ? data?.heroes.filter((hero) => hero.role === selectedRole)
    : data?.heroes;

  if (isError) return <ErrorMessage message={HERO_MESSAGES.LOAD_FAILED} />;
  if (isLoading) return <Spinner />;

  return (
    <>
      <h1 className="mb-6 text-xl font-bold text-oow-white">{NAV_LABELS.HEROES}</h1>
      <div className="mb-6">
        <RoleFilterGroup
          selectedRole={selectedRole ?? "all"}
          onRoleChange={(role) => setSelectedRole(role === "all" ? null : (role as HeroRole))}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 ">
        {filteredHeroes?.map((hero) => (
          <HeroCard key={hero.key} hero={hero} />
        ))}
      </div>
    </>
  );
};
