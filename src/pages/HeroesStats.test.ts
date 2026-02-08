import {describe, it, expect} from "vitest";
import type {HeroStatItem, SortKey, SortOrder} from "../types/hero";

const sortStats = (
  stats: HeroStatItem[],
  sortKey: SortKey,
  sortOrder: SortOrder,
) => {
  const modifier = sortOrder === "desc" ? -1 : 1;
  return stats.toSorted((a, b) => (a[sortKey] - b[sortKey]) * modifier);
};

const mockStats: HeroStatItem[] = [
  {
    key: "genji",
    name: "겐지",
    role: "damage",
    portrait: "",
    winrate: 52.3,
    pickrate: 8.1,
  },
  {
    key: "tracer",
    name: "트레이서",
    role: "damage",
    portrait: "",
    winrate: 49.8,
    pickrate: 12.5,
  },
  {
    key: "reinhardt",
    name: "라인하르트",
    role: "tank",
    portrait: "",
    winrate: 55.1,
    pickrate: 6.3,
  },
  {
    key: "ana",
    name: "아나",
    role: "support",
    portrait: "",
    winrate: 51.0,
    pickrate: 15.2,
  },
];

describe("HeroesStats 정렬 로직", () => {
  describe("승률 정렬", () => {
    it("내림차순이면 승률이 높은 영웅이 먼저 온다", () => {
      const sorted = sortStats(mockStats, "winrate", "desc");

      expect(sorted[0].key).toBe("reinhardt");
      expect(sorted[1].key).toBe("genji");
      expect(sorted[3].key).toBe("tracer");
    });

    it("오름차순이면 승률이 낮은 영웅이 먼저 온다", () => {
      const sorted = sortStats(mockStats, "winrate", "asc");

      expect(sorted[0].key).toBe("tracer");
      expect(sorted[3].key).toBe("reinhardt");
    });
  });

  describe("픽률 정렬", () => {
    it("내림차순이면 픽률이 높은 영웅이 먼저 온다", () => {
      const sorted = sortStats(mockStats, "pickrate", "desc");

      expect(sorted[0].key).toBe("ana");
      expect(sorted[1].key).toBe("tracer");
    });

    it("오름차순이면 픽률이 낮은 영웅이 먼저 온다", () => {
      const sorted = sortStats(mockStats, "pickrate", "asc");

      expect(sorted[0].key).toBe("reinhardt");
      expect(sorted[3].key).toBe("ana");
    });
  });

  describe("정렬 안정성", () => {
    it("원본 배열을 변경하지 않는다", () => {
      const original = [...mockStats];

      sortStats(mockStats, "winrate", "desc");

      expect(mockStats).toEqual(original);
    });
  });
});
