import { HeroCard } from "./HeroCard";
import type { Hero } from "../types/hero";

interface HeroRelationshipSectionProps {
  title: string;
  description: string;
  heroes: Hero[];
}
export const HeroRelationshipSection = ({
  title,
  description,
  heroes,
}: HeroRelationshipSectionProps) => (
  <section>
    <h2 className="text-lg font-bold text-oow-white">{title}</h2>
    <p className="mb-3 text-xs text-oow-gray">{description}</p>
    <div className="grid grid-cols-3 gap-2">
      {heroes.map((hero) => (
        <HeroCard key={hero.key} hero={hero} />
      ))}
    </div>
  </section>
);
