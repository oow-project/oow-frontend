import { useChatStore } from "../../stores/chatStore";
import { useConversations } from "../../hooks/useConversations";
import { useGuestLoad } from "../../hooks/useGuestLoad";
import { useSendMessage } from "../../hooks/useSendMessage";
import { ConversationList } from "./ConversationList";
import { ChatHeader } from "./ChatHeader";
import { ChatBody } from "./ChatBody";
import { ChatFooter } from "./ChatFooter";

export const AISidePanel = () => {
  const isAISidePanelOpen = useChatStore((state) => state.isAISidePanelOpen);
  const currentConversationId = useChatStore((state) => state.currentConversationId);
  const setAnalysisCard = useChatStore((state) => state.setAnalysisCard);

  const { data: conversations } = useConversations();
  const sendMessage = useSendMessage();

  useGuestLoad();

  const currentConversation = conversations?.find(
    (conversation) => conversation.id === currentConversationId,
  );
  const headerTitle = currentConversation?.title ?? "새 대화";

  const handleSuggestionSelect = (question: string) => {
    setAnalysisCard(null);
    sendMessage(question);
  };

  if (!isAISidePanelOpen) {
    return null;
  }

  return (
    <aside
      className="
        fixed top-[68px] right-0 bottom-0
        w-full md:w-[480px]
        bg-oow-navy-800
        border-l border-oow-navy-600
        flex flex-col
        z-40
      "
    >
      <ChatHeader headerTitle={headerTitle} />
      <ChatBody onSuggestionSelect={handleSuggestionSelect} />
      <ChatFooter />
      <ConversationList />
    </aside>
  );
};
