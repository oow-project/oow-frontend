import { useQueryClient } from "@tanstack/react-query";

import { sendChatMessage, RateLimitError } from "../api/chat";
import { saveGuestMessages } from "../utils/guestStorage";
import { useChatStore } from "../stores/chatStore";
import { useAuthStore } from "../stores/authStore";
import { useChatDisplayMessages } from "./useChatDisplayMessages";

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const displayMessages = useChatDisplayMessages();

  const send = async (message: string) => {
    const {
      currentConversationId,
      addLocalMessage,
      setStreamingContent,
      setIsLoadingResponse,
      setCurrentConversationId,
      setRateLimitResetAfter,
    } = useChatStore.getState();

    const user = useAuthStore.getState().user;

    setIsLoadingResponse(true);

    addLocalMessage({
      role: "user",
      content: message,
      createdAt: new Date(),
    });

    await sendChatMessage(
      {
        message,
        conversationId: currentConversationId ?? undefined,
        chatHistory: displayMessages.map(({ role, content }) => ({ role, content })),
      },
      {
        onChunk: (chunk) => {
          const currentContent = useChatStore.getState().streamingContent;
          setStreamingContent(currentContent + chunk);
        },
        onComplete: () => {
          const finalContent = useChatStore.getState().streamingContent;

          addLocalMessage({
            role: "assistant",
            content: finalContent,
            createdAt: new Date(),
          });

          if (!user) {
            const allMessages = useChatStore.getState().localMessages;
            saveGuestMessages(allMessages.map(({ role, content }) => ({ role, content })));
          }

          setStreamingContent("");
          setIsLoadingResponse(false);
        },
        onError: (error) => {
          console.error("Chat error:", error);
          if (error instanceof RateLimitError) {
            setRateLimitResetAfter(error.resetAfter);
          }
          setIsLoadingResponse(false);
        },
        onMeta: async (meta) => {
          setCurrentConversationId(meta.conversationId);
          queryClient.invalidateQueries({ queryKey: ["conversations"] });
          await queryClient.refetchQueries({
            queryKey: ["conversations", meta.conversationId, "messages"],
          });
        },
      },
    );
  };

  return send;
};
