import { HTTPError } from "ky";
import { api } from "./client";

interface ChatRequestParams {
  message: string;
  conversationId?: string;
  tag?: string;
}

interface StreamCallbacks {
  onChunk: (content: string) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
  onMeta?: (meta: { conversationId: string }) => void;
}

export class RateLimitError extends Error {
  resetAfter: number;

  constructor(resetAfter: number = 0) {
    super("요청 한도를 초과했습니다.");

    this.name = "RateLimitError";
    this.resetAfter = resetAfter;
  }
}

export const sendChatMessage = async (
  params: ChatRequestParams,
  callbacks: StreamCallbacks,
): Promise<void> => {
  const { message, conversationId, tag = "general" } = params;
  const { onChunk, onComplete, onError, onMeta } = callbacks;

  try {
    const response = await api.post("api/chat", {
      json: {
        message,
        conversationId,
        tag,
      },
    });

    const reader = response.body?.getReader();

    if (!reader) {
      throw new Error("응답 본문을 읽을 수 없습니다");
    }

    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;

        try {
          const jsonStr = line.replace("data: ", "").trim();
          const data = JSON.parse(jsonStr);

          if (data.type === "content") {
            onChunk(data.content);
          } else if (data.type === "meta") {
            onMeta?.({ conversationId: data.conversationId });
          }
        } catch {
          console.warn("JSON 파싱 실패:", line);
        }
      }
    }

    onComplete();
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 429) {
      const body = await error.response.json();
      const resetAfter = body.detail?.reset_after ?? 0;
      onError(new RateLimitError(resetAfter));
      return;
    }
    onError(error instanceof Error ? error : new Error("알 수 없는 오류가 발생했습니다."));
  }
};
