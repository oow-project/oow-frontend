import { HTTPError } from "ky";
import { api } from "./client";
import { DEFAULT_TAG } from "../constants/api";
import { CHAT_MESSAGES } from "../constants/messages";

interface ChatRequestParams {
  message: string;
  conversationId?: string;
  tag?: string;
  chatHistory?: Array<{ role: string; content: string }>;
}

interface StreamCallbacks {
  onChunk: (content: string) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
  onMeta?: (meta: { conversationId: string }) => void | Promise<void>;
  onToolStatus?: (type: "tool_start" | "tool_end", tool: string) => void;
}

export class RateLimitError extends Error {
  resetAfter: number;

  constructor(resetAfter: number = 0) {
    super(CHAT_MESSAGES.RATE_LIMIT);

    this.name = "RateLimitError";
    this.resetAfter = resetAfter;
  }
}

export const sendChatMessage = async (
  params: ChatRequestParams,
  callbacks: StreamCallbacks,
): Promise<void> => {
  const { message, conversationId, tag = DEFAULT_TAG, chatHistory } = params;
  const { onChunk, onComplete, onError, onMeta, onToolStatus } = callbacks;

  try {
    const response = await api.post("api/chat", {
      json: {
        message,
        conversationId,
        tag,
        chatHistory,
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
            await onMeta?.({ conversationId: data.conversationId });
          } else if (data.type === "tool_start" || data.type === "tool_end") {
            onToolStatus?.(data.type, data.tool);
          } else if (data.type === "error") {
            onError(new Error(data.content));
            return;
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
