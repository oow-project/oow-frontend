import {describe, it, expect, beforeEach} from "vitest";
import {useChatStore} from "../stores/chatStore";

describe("chatStore", () => {
  beforeEach(() => {
    useChatStore.setState({
      isAISidePanelOpen: false,
      currentConversationId: null,
      localMessages: [],
      streamingContent: "",
      analysisCard: null,
      isLoadingResponse: false,
      isConversationListOpen: false,
      rateLimitResetAfter: null,
    });
  });

  describe("초기 상태", () => {
    it("패널은 닫혀있고 메시지는 비어있다", () => {
      const state = useChatStore.getState();

      expect(state.isAISidePanelOpen).toBe(false);
      expect(state.localMessages).toEqual([]);
      expect(state.currentConversationId).toBeNull();
    });
  });

  describe("메시지 관리", () => {
    it("addLocalMessage로 메시지를 추가하면 기존 메시지가 유지된다", () => {
      const msg1 = {
        role: "user" as const,
        content: "겐지 승률 알려줘",
        createdAt: new Date(),
      };
      const msg2 = {
        role: "assistant" as const,
        content: "겐지의 현재 승률은 52.3%입니다.",
        createdAt: new Date(),
      };

      useChatStore.getState().addLocalMessage(msg1);
      useChatStore.getState().addLocalMessage(msg2);

      const {localMessages} = useChatStore.getState();

      expect(localMessages).toHaveLength(2);
      expect(localMessages[0].content).toBe("겐지 승률 알려줘");
      expect(localMessages[1].content).toBe("겐지의 현재 승률은 52.3%입니다.");
    });

    it("clearLocalMessages로 메시지를 비울 수 있다", () => {
      useChatStore.getState().addLocalMessage({
        role: "user",
        content: "트레이서 카운터 알려줘",
        createdAt: new Date(),
      });

      useChatStore.getState().clearLocalMessages();

      expect(useChatStore.getState().localMessages).toEqual([]);
    });
  });

  describe("resetChat", () => {
    it("패널을 열린 상태로 유지하고 나머지를 초기화한다", () => {
      useChatStore.getState().addLocalMessage({
        role: "user",
        content: "라인하르트 팁 알려줘",
        createdAt: new Date(),
      });
      useChatStore.getState().setCurrentConversationId("conv-1");
      useChatStore.getState().setStreamingContent("라인하르트는...");

      useChatStore.getState().resetChat();

      const state = useChatStore.getState();

      expect(state.isAISidePanelOpen).toBe(true);
      expect(state.localMessages).toEqual([]);
      expect(state.currentConversationId).toBeNull();
      expect(state.streamingContent).toBe("");
    });
  });

  describe("resetChatContent", () => {
    it("현재 패널 상태를 유지하면서 콘텐츠만 초기화한다", () => {
      useChatStore.getState().openAISidePanel();
      useChatStore.getState().addLocalMessage({
        role: "user",
        content: "위도우 상대법 알려줘",
        createdAt: new Date(),
      });
      useChatStore.getState().setCurrentConversationId("conv-1");

      useChatStore.getState().resetChatContent();

      const state = useChatStore.getState();

      expect(state.isAISidePanelOpen).toBe(true);
      expect(state.localMessages).toEqual([]);
      expect(state.currentConversationId).toBeNull();
    });

    it("패널이 닫힌 상태에서 호출하면 닫힌 채로 유지된다", () => {
      useChatStore.getState().closeAISidePanel();
      useChatStore.getState().addLocalMessage({
        role: "user",
        content: "아나 힐량 궁금해",
        createdAt: new Date(),
      });

      useChatStore.getState().resetChatContent();

      expect(useChatStore.getState().isAISidePanelOpen).toBe(false);
    });
  });

  describe("Rate Limit", () => {
    it("setRateLimitResetAfter로 리셋 시간을 설정할 수 있다", () => {
      useChatStore.getState().setRateLimitResetAfter(3600);

      expect(useChatStore.getState().rateLimitResetAfter).toBe(3600);
    });

    it("null로 설정하면 Rate Limit이 해제된다", () => {
      useChatStore.getState().setRateLimitResetAfter(3600);
      useChatStore.getState().setRateLimitResetAfter(null);

      expect(useChatStore.getState().rateLimitResetAfter).toBeNull();
    });
  });
});
