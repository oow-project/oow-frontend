import { useState } from "react";
import { ArrowLeft, MessageSquare, Plus, Trash2, X } from "lucide-react";

import { useConversations, useDeleteConversation } from "../../hooks/useConversations";
import { useChatStore } from "../../stores/chatStore";
import { IconButton } from "../ui/IconButton";
import { Button } from "../ui/Button";

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
      <header className="flex items-center justify-between border-b border-oow-navy-600 px-4 py-3">
        <div className="flex items-center gap-2">
          <IconButton onClick={closeConversationList} size="sm">
            <ArrowLeft size={20} />
          </IconButton>
          <span className="text-lg font-bold text-oow-white">대화 목록</span>
        </div>
        <IconButton
          variant="secondary"
          size="sm"
          onClick={closeAISidePanel}
          className="bg-oow-gray"
        >
          <X size={20} />
        </IconButton>
      </header>
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
          <div className="py-8 text-center text-oow-gray">
            <MessageSquare size={48} className="mx-auto mb-2 opacity-50" />
            <p>대화 기록이 없습니다</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {conversations?.map((conversation) => (
              <li
                key={conversation.id}
                className={`group flex w-full items-center justify-between rounded-lg transition-colors ${
                  currentConversationId === conversation.id
                    ? "bg-oow-orange"
                    : "bg-oow-navy-700 hover:bg-oow-navy-600"
                }`}
              >
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleSelectConversation(conversation.id)}
                  className="flex w-full min-w-0 flex-1 items-center justify-between px-4 py-3 text-left text-oow-white hover:bg-transparent"
                >
                  <span className="block min-w-0 flex-1">
                    <span className="block truncate font-medium">{conversation.title}</span>
                    <span className="block text-xs opacity-70">
                      {new Date(conversation.createdAt).toLocaleDateString("ko-KR")}
                    </span>
                  </span>
                </Button>
                <IconButton
                  onClick={(event) => handleDeleteConversation(event, conversation.id)}
                  disabled={deletingId === conversation.id}
                  className={`mr-3 opacity-0 transition-opacity group-hover:opacity-100 ${
                    currentConversationId === conversation.id
                      ? "hover:bg-oow-navy-900/20"
                      : "hover:bg-oow-navy-500"
                  }`}
                >
                  <Trash2 size={16} />
                </IconButton>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
