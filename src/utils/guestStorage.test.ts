import {describe, it, expect, beforeEach} from "vitest";
import {
  saveGuestMessages,
  loadGuestMessages,
  clearGuestMessages,
  hasGuestMessages,
} from "../utils/guestStorage";

describe("guestStorage", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  describe("saveGuestMessages / loadGuestMessages", () => {
    it("메시지를 저장하고 로딩할 수 있다", () => {
      const messages = [
        {role: "user" as const, content: "겐지 승률 알려줘"},
        {
          role: "assistant" as const,
          content: "겐지의 현재 승률은 52.3%입니다.",
        },
      ];

      saveGuestMessages(messages);
      const loaded = loadGuestMessages();

      expect(loaded).toEqual(messages);
    });

    it("저장된 데이터가 없으면 빈 배열을 반환한다", () => {
      expect(loadGuestMessages()).toEqual([]);
    });
  });

  describe("loadGuestMessages 방어적 파싱", () => {
    it("손상된 JSON이면 빈 배열을 반환한다", () => {
      sessionStorage.setItem("oow_guest_messages", "{invalid json");

      expect(loadGuestMessages()).toEqual([]);
    });

    it("배열이 아닌 값이면 빈 배열을 반환한다", () => {
      sessionStorage.setItem(
        "oow_guest_messages",
        JSON.stringify({not: "array"}),
      );

      expect(loadGuestMessages()).toEqual([]);
    });

    it("유효하지 않은 role을 가진 메시지는 필터링한다", () => {
      const mixed = [
        {role: "user", content: "트레이서 카운터 알려줘"},
        {role: "system", content: "시스템 메시지"},
        {role: "assistant", content: "트레이서의 카운터는 솜브라입니다."},
      ];
      sessionStorage.setItem("oow_guest_messages", JSON.stringify(mixed));

      const loaded = loadGuestMessages();

      expect(loaded).toHaveLength(2);
      expect(loaded[0].content).toBe("트레이서 카운터 알려줘");
      expect(loaded[1].content).toBe("트레이서의 카운터는 솜브라입니다.");
    });

    it("content가 string이 아닌 메시지는 필터링한다", () => {
      const broken = [
        {role: "user", content: "라인하르트 팁 알려줘"},
        {role: "user", content: 123},
      ];
      sessionStorage.setItem("oow_guest_messages", JSON.stringify(broken));

      expect(loadGuestMessages()).toHaveLength(1);
    });
  });

  describe("clearGuestMessages", () => {
    it("저장된 메시지를 삭제한다", () => {
      saveGuestMessages([{role: "user", content: "위도우 상대법 알려줘"}]);
      clearGuestMessages();

      expect(loadGuestMessages()).toEqual([]);
    });
  });

  describe("hasGuestMessages", () => {
    it("메시지가 있으면 true를 반환한다", () => {
      saveGuestMessages([{role: "user", content: "아나 힐량 궁금해"}]);

      expect(hasGuestMessages()).toBe(true);
    });

    it("메시지가 없으면 false를 반환한다", () => {
      expect(hasGuestMessages()).toBe(false);
    });

    it("손상된 데이터면 false를 반환한다", () => {
      sessionStorage.setItem("oow_guest_messages", "broken");

      expect(hasGuestMessages()).toBe(false);
    });
  });
});
