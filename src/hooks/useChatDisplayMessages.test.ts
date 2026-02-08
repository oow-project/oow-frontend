import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useChatDisplayMessages } from "../hooks/useChatDisplayMessages";
import { useChatStore } from "../stores/chatStore";
import { useConversationMessages } from "../hooks/useConversations";
import type { ChatMessage } from "../types/chat";
import type { ConversationMessage } from "../api/conversation";

vi.mock("../stores/chatStore", () => ({
  useChatStore: vi.fn(),
}));

vi.mock("../hooks/useConversations", () => ({
  useConversationMessages: vi.fn(),
}));

vi.mock("../api/conversation", () => ({
  toChatMessage: (msg: ConversationMessage): ChatMessage => ({
    id: msg.id,
    role: msg.role,
    content: msg.content,
    createdAt: new Date(msg.createdAt),
  }),
}));

const mockedUseChatStore = vi.mocked(useChatStore);
const mockedUseConversationMessages = vi.mocked(useConversationMessages);

const makeLocalMessage = (content: string, role: "user" | "assistant" = "user"): ChatMessage => ({
  role,
  content,
  createdAt: new Date(),
});

const makeServerMessage = (
  content: string,
  role: "user" | "assistant" = "user",
): ConversationMessage => ({
  id: `server-${content}`,
  role,
  content,
  createdAt: new Date().toISOString(),
});

describe("useChatDisplayMessages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("conversationId가 없으면 로컬 메시지만 반환한다", () => {
    const localMessages = [makeLocalMessage("겐지 상대법 알려줘")];

    mockedUseChatStore.mockImplementation((selector: any) => {
      const state = { currentConversationId: null, localMessages };

      return selector(state);
    });
    mockedUseConversationMessages.mockReturnValue({ data: undefined } as any);

    const { result } = renderHook(() => useChatDisplayMessages());

    expect(result.current).toHaveLength(1);
    expect(result.current[0].content).toBe("겐지 상대법 알려줘");
  });

  it("conversationId가 있으면 서버 + 로컬 메시지를 병합한다", () => {
    const localMessages = [makeLocalMessage("트레이서 픽률은?")];
    const serverMessages = [makeServerMessage("겐지 승률 알려줘")];

    mockedUseChatStore.mockImplementation((selector: any) => {
      const state = { currentConversationId: "conv-1", localMessages };
      return selector(state);
    });
    mockedUseConversationMessages.mockReturnValue({
      data: serverMessages,
    } as any);

    const { result } = renderHook(() => useChatDisplayMessages());

    expect(result.current).toHaveLength(2);
    expect(result.current[0].content).toBe("겐지 승률 알려줘");
    expect(result.current[1].content).toBe("트레이서 픽률은?");
  });

  it("서버에 이미 존재하는 로컬 메시지는 중복 제거된다", () => {
    const localMessages = [makeLocalMessage("라인하르트 카운터 알려줘")];
    const serverMessages = [makeServerMessage("라인하르트 카운터 알려줘")];

    mockedUseChatStore.mockImplementation((selector: any) => {
      const state = { currentConversationId: "conv-1", localMessages };
      return selector(state);
    });
    mockedUseConversationMessages.mockReturnValue({
      data: serverMessages,
    } as any);

    const { result } = renderHook(() => useChatDisplayMessages());

    expect(result.current).toHaveLength(1);
    expect(result.current[0].content).toBe("라인하르트 카운터 알려줘");
  });

  it("동일 내용의 메시지를 여러 번 보내도 모두 표시된다", () => {
    const localMessages = [
      makeLocalMessage("겐지 승률 알려줘"),
      makeLocalMessage("겐지 승률 알려줘"),
    ];
    const serverMessages = [makeServerMessage("겐지 승률 알려줘")];

    mockedUseChatStore.mockImplementation((selector: any) => {
      const state = { currentConversationId: "conv-1", localMessages };
      return selector(state);
    });
    mockedUseConversationMessages.mockReturnValue({
      data: serverMessages,
    } as any);

    const { result } = renderHook(() => useChatDisplayMessages());

    // 서버 메시지 1개 + 아직 동기화되지 않은 로컬 메시지 1개 = 2개
    expect(result.current).toHaveLength(2);
  });
});
