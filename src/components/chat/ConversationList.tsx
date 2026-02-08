import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";

import { useConversations, useDeleteConversation } from "../../hooks/useConversations";
import { useChatStore } from "../../stores/chatStore";
import { IconButton } from "../ui/IconButton";
import { Button } from "../ui/Button";
import { ChatPanelHeader } from "./ChatPanelHeader";
import { ConversationItem } from "./ConversationItem";
import { ConversationEmpty } from "./ConversationEmpty";

export const ConversationList = () => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const isConversationListOpen = useChatStore((state) => state.isConversationListOpen);
  const closeConversationList = useChatStore((state) => state.closeConversationList);
  const closeAISidePanel = useChatStore((state) => state.closeAISidePanel);
  const currentConversationId = useChatStore((state) => state.currentConversationId);
  const setCurrentConversationId = useChatStore((state) => state.setCurrentConversationId);
  const clearLocalMessages = useChatStore((state) => state.clearLocalMessages);
  const resetChat = useChatStore((state) => state.resetChat);

  const { data: conversations, isLoading } = useConversations();
  const deleteMutation = useDeleteConversation();

  if (!isConversationListOpen) return null;

  const handleSelectConversation = (conversationId: string) => {
    clearLocalMessages();
    setCurrentConversationId(conversationId);
    closeConversationList();
  };

  const handleNewConversation = () => {
    resetChat();
    closeConversationList();
  };

  const handleDeleteConversation = (event: React.MouseEvent, conversationId: string) => {
    event.stopPropagation();
    if (deletingId === conversationId) return;

    setDeletingId(conversationId);
    deleteMutation.mutate(conversationId, {
      onSettled: () => setDeletingId(null),
    });

    if (currentConversationId === conversationId) resetChat();
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-oow-navy-800">
      <ChatPanelHeader
        title="대화 목록"
        onClose={closeAISidePanel}
        leftAction={
          <IconButton onClick={closeConversationList} size="sm">
            <ArrowLeft size={20} />
          </IconButton>
        }
      />
      <div className="flex-1 overflow-y-auto p-4">
        <Button
          variant="ghost"
          size="md"
          onClick={handleNewConversation}
          className="mb-4 flex w-full items-center gap-3 rounded-lg border border-dashed border-oow-navy-500 px-4 py-3 text-oow-gray hover:border-oow-orange hover:text-oow-white"
        >
          <Plus size={20} />
          <span>새 대화 시작하기</span>
        </Button>
        {isLoading ? (
          <div className="py-8 text-center text-oow-gray">로딩 중...</div>
        ) : conversations?.length === 0 ? (
          <ConversationEmpty />
        ) : (
          <ul className="space-y-2">
            {conversations?.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isSelected={currentConversationId === conversation.id}
                isDeleting={deletingId === conversation.id}
                onSelect={handleSelectConversation}
                onDelete={handleDeleteConversation}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
