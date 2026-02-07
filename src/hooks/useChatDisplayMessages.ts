import { useChatStore } from "../stores/chatStore";
import { useConversationMessages } from "./useConversations";
import { toChatMessage } from "../api/conversation";

import type { ChatMessage } from "../types/chat";

export const useChatDisplayMessages = () => {
  const currentConversationId = useChatStore((state) => state.currentConversationId);
  const localMessages = useChatStore((state) => state.localMessages);
  const { data: serverMessages } = useConversationMessages(currentConversationId);

  const serverChatMessages = serverMessages?.map(toChatMessage) ?? [];

  const isAlreadyOnServer = (local: ChatMessage) =>
    serverMessages?.some(
      (server) => server.content === local.content && server.role === local.role,
    );

  const unsyncedLocalMessages = localMessages.filter((local) => !isAlreadyOnServer(local));

  const mergedMessages = [...serverChatMessages, ...unsyncedLocalMessages];

  const displayMessages = currentConversationId ? mergedMessages : localMessages;

  return displayMessages;
};
