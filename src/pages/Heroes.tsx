import { HeroCard } from "../components/HeroCard";
import type { Hero } from "../types/hero";

const MOCK_HEROES: Hero[] = [
  {
    key: "reinhardt",
    name: "라인하르트",
    portrait:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/490d2f79f8547d6e364306af60c8184fb8024b8e55809e4cc501126109981a65.png",
    role: "tank",
  },
  {
    key: "reinhardt",
    name: "라인하르트",
    portrait:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/490d2f79f8547d6e364306af60c8184fb8024b8e55809e4cc501126109981a65.png",
    role: "tank",
  },
  {
    key: "reinhardt",
    name: "라인하르트",
    portrait:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/490d2f79f8547d6e364306af60c8184fb8024b8e55809e4cc501126109981a65.png",
    role: "tank",
  },
  {
    key: "reinhardt",
    name: "라인하르트",
    portrait:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/490d2f79f8547d6e364306af60c8184fb8024b8e55809e4cc501126109981a65.png",
    role: "tank",
  },
  {
    key: "reinhardt",
    name: "라인하르트",
    portrait:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/490d2f79f8547d6e364306af60c8184fb8024b8e55809e4cc501126109981a65.png",
    role: "tank",
  },
  {
    key: "reinhardt",
    name: "라인하르트",
    portrait:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/490d2f79f8547d6e364306af60c8184fb8024b8e55809e4cc501126109981a65.png",
    role: "tank",
  },
];

export const Heroes = () => {
  return (
    <>
      <h1 className="mb-6 text-xl font-bold text-oow-white">영웅 정보</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {MOCK_HEROES.map((hero) => (
          <HeroCard key={hero.key} hero={hero} />
        ))}
      </div>
    </>
  );
};
