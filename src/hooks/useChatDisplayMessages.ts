import { useChatStore } from "../stores/chatStore";
import { useConversationMessages } from "./useConversations";
import { toChatMessage } from "../api/conversation";

export const useChatDisplayMessages = () => {
  const currentConversationId = useChatStore((state) => state.currentConversationId);
  const localMessages = useChatStore((state) => state.localMessages);
  const { data: serverMessages } = useConversationMessages(currentConversationId);

  const serverChatMessages = serverMessages?.map(toChatMessage) ?? [];

  const unsyncedLocalMessages = (() => {
    if (!serverMessages) return localMessages;

    const remainingServerMessages = [...serverMessages];

    return localMessages.filter((local) => {
      const matchIndex = remainingServerMessages.findIndex(
        (server) => server.content === local.content && server.role === local.role,
      );

      if (matchIndex >= 0) {
        remainingServerMessages.splice(matchIndex, 1);

        return false;
      }

      return true;
    });
  })();

  const mergedMessages = [...serverChatMessages, ...unsyncedLocalMessages];

  const displayMessages = currentConversationId ? mergedMessages : localMessages;

  return displayMessages;
};
