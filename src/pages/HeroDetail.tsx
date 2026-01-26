import { useParams } from "react-router";
import { useHeroDetail } from "../hooks/useHeroes";
import { SkillTable } from "../components/SkillTable";
import { HeroRelationshipSection } from "../components/HeroRelationshipSection";
import { StatItem } from "../components/StatItem";

import type { HeroRole } from "../types/hero";

const ROLE_LABELS: Record<HeroRole, string> = {
  tank: "탱커",
  damage: "딜러",
  support: "힐러",
};

export const HeroDetail = () => {
  const { heroKey } = useParams();
  const { data, isLoading, isError } = useHeroDetail(heroKey);

  if (!heroKey) {
    return <p className="p-4 text-oow-orange md:p-6">잘못된 접근입니다.</p>;
  }

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

  if (!data) return null;

  const minorPerks = data.perks.filter((perk) => perk.type === "minor");
  const majorPerks = data.perks.filter((perk) => perk.type === "major");

  return (
    <div className="space-y-11">
      <div className="flex flex-wrap items-center gap-4">
        <img src={data.portrait} alt={data.name} className="h-24 w-24 rounded" />
        <div>
          <h1 className="text-2xl font-bold text-oow-white">{data.name}</h1>
          <span className="text-sm text-oow-gray">{ROLE_LABELS[data.role]}</span>
        </div>
        <div className="flex gap-4 text-sm">
          <StatItem label="체력" value={data.hitpoints.health} />
          <StatItem label="방어력" value={data.hitpoints.armor} />
          <StatItem label="보호막" value={data.hitpoints.shields} />
          <StatItem label="합계" value={data.hitpoints.total} highlight />
        </div>
      </div>
      <SkillTable title="스킬" rows={data.abilities} />
      <SkillTable title="특전 - 보조" rows={minorPerks} />
      <SkillTable title="특전 - 주요" rows={majorPerks} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <HeroRelationshipSection
          title="카운터"
          description="상대하기 까다로운 영웅"
          heroes={data.counters}
        />
        <HeroRelationshipSection
          title="시너지"
          description="궁합이 좋은 영웅"
          heroes={data.synergies}
        />
      </div>
    </div>
  );
};
