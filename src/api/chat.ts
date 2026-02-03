import { api } from "./client";

interface ChatRequestParams {
  message: string;
  conversationId?: string;
  tag?: string;
}

interface StreamCallbacks {
  onChunk: (chunk: string) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
}

export const sendChatMessage = async (
  params: ChatRequestParams,
  callbacks: StreamCallbacks,
): Promise<void> => {
  const { message, conversationId, tag = "general" } = params;
  const { onChunk, onComplete, onError } = callbacks;

  try {
    const response = await api.post("api/chat", {
      json: {
        message,
        conversation_id: conversationId,
        tag,
      },
    });

    const reader = response.body?.getReader();

    if (!reader) {
      throw new Error("응답 본문을 읽을 수 없습니다");
    }

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      onChunk(chunk);
    }

    onComplete();
  } catch (error) {
    onError(error instanceof Error ? error : new Error("알 수 없는 오류가 발생했습니다."));
  }
};
