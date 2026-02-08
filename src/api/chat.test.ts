import { describe, it, expect, vi, beforeEach } from "vitest";
import { HTTPError } from "ky";
import { sendChatMessage, RateLimitError } from "../api/chat";
import { api } from "../api/client";

vi.mock("../api/client", () => ({
  api: {
    post: vi.fn(),
  },
}));

vi.mock("../constants/api", () => ({
  DEFAULT_TAG: "overwatch",
}));

vi.mock("../constants/messages", () => ({
  CHAT_MESSAGES: { RATE_LIMIT: "요청 한도를 초과했습니다." },
}));

const mockedPost = vi.mocked(api.post);

const createMockStream = (chunks: string[]) => {
  const encoder = new TextEncoder();
  let index = 0;

  return new ReadableStream({
    pull(controller) {
      if (index < chunks.length) {
        controller.enqueue(encoder.encode(chunks[index]));
        index++;
      } else {
        controller.close();
      }
    },
  });
};

describe("sendChatMessage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("SSE content 청크를 정상적으로 파싱한다", async () => {
    const chunks: string[] = [];
    const stream = createMockStream([
      'data: {"type":"content","content":"겐지의"}\n',
      'data: {"type":"content","content":" 승률은 52.3%입니다."}\n',
    ]);

    mockedPost.mockResolvedValue({ body: stream } as any);

    await sendChatMessage(
      { message: "겐지 승률 알려줘" },
      {
        onChunk: (content: string) => chunks.push(content),
        onComplete: () => {},
        onError: () => {},
      },
    );

    expect(chunks).toEqual(["겐지의", " 승률은 52.3%입니다."]);
  });

  it("SSE meta 이벤트에서 conversationId를 전달한다", async () => {
    const stream = createMockStream([
      'data: {"type":"meta","conversationId":"conv-abc"}\n',
      'data: {"type":"content","content":"응답"}\n',
    ]);

    let receivedId = "";

    mockedPost.mockResolvedValue({ body: stream } as any);

    await sendChatMessage(
      { message: "트레이서 카운터 알려줘" },
      {
        onChunk: () => {},
        onComplete: () => {},
        onError: () => {},
        onMeta: (meta: { conversationId: string }) => {
          receivedId = meta.conversationId;
        },
      },
    );

    expect(receivedId).toBe("conv-abc");
  });

  it("429 응답이면 RateLimitError를 전달한다", async () => {
    const mockResponse = {
      status: 429,
      json: async () => ({ detail: { reset_after: 3600 } }),
    };
    const httpError = new HTTPError(mockResponse as any, {} as any, {} as any);

    let capturedError: Error | null = null;

    mockedPost.mockRejectedValue(httpError);

    await sendChatMessage(
      { message: "솜브라 분석해줘" },
      {
        onChunk: () => {},
        onComplete: () => {},
        onError: (error: Error) => {
          capturedError = error;
        },
      },
    );

    expect(capturedError).toBeInstanceOf(RateLimitError);
    expect((capturedError as unknown as RateLimitError).resetAfter).toBe(3600);
  });

  it("onComplete는 스트림이 정상 종료되면 호출된다", async () => {
    const stream = createMockStream(['data: {"type":"content","content":"완료"}\n']);

    let completed = false;

    mockedPost.mockResolvedValue({ body: stream } as any);

    await sendChatMessage(
      { message: "메르시 팁 알려줘" },
      {
        onChunk: () => {},
        onComplete: () => {
          completed = true;
        },
        onError: () => {},
      },
    );

    expect(completed).toBe(true);
  });

  it("SSE error 이벤트를 수신하면 onError를 호출한다", async () => {
    const stream = createMockStream([
      'data: {"type":"content","content":"겐지의 승"}\n',
      'data: {"type":"error","content":"요청이 많아 응답할 수 없습니다."}\n',
    ]);

    let capturedError: Error | null = null;
    let completed = false;

    mockedPost.mockResolvedValue({ body: stream } as any);

    await sendChatMessage(
      { message: "겐지 분석해줘" },
      {
        onChunk: () => {},
        onComplete: () => {
          completed = true;
        },
        onError: (error: Error) => {
          capturedError = error;
        },
      },
    );

    expect(capturedError).toBeInstanceOf(Error);
    expect(capturedError!.message).toBe("요청이 많아 응답할 수 없습니다.");
    // error 이벤트 후에는 onComplete가 호출되면 안 된다
    expect(completed).toBe(false);
  });
});
