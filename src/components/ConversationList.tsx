import { Plus, Trash2, X, MessageSquare, ArrowLeft } from "lucide-react";

import { useConversations, useDeleteConversation } from "../hooks/useConversations";
import { useChatStore } from "../stores/chatStore";

export const ConversationList = () => {
  const isConversationListOpen = useChatStore((state) => state.isConversationListOpen);
  const closeConversationList = useChatStore((state) => state.closeConversationList);
  const closeAISidePanel = useChatStore((state) => state.closeAISidePanel);
  const currentConversationId = useChatStore((state) => state.currentConversationId);
  const setCurrentConversationId = useChatStore((state) => state.setCurrentConversationId);
  const clearPendingMessages = useChatStore((state) => state.clearPendingMessages);
  const resetChat = useChatStore((state) => state.resetChat);

  const { data: conversations, isLoading } = useConversations();
  const deleteConversationMutation = useDeleteConversation();

  if (!isConversationListOpen) {
    return null;
  }

  const handleSelectConversation = (conversationId: string) => {
    clearPendingMessages();
    setCurrentConversationId(conversationId);
    closeConversationList();
  };

  const handleNewConversation = () => {
    resetChat();
    closeConversationList();
  };

  const handleDeleteConversation = (event: React.MouseEvent, conversationId: string) => {
    event.stopPropagation();
    deleteConversationMutation.mutate(conversationId);

    if (currentConversationId === conversationId) {
      resetChat();
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-oow-navy-800">
      <header className="flex items-center justify-between border-b border-oow-navy-600 px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={closeConversationList}
            className="rounded p-1 text-oow-gray hover:bg-oow-navy-600 hover:text-oow-white"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-lg font-bold text-oow-white">대화 목록</span>
        </div>
        <button type="button" onClick={closeAISidePanel} className="rounded bg-oow-gray p-1">
          <X size={20} />
        </button>
      </header>
      <div className="flex-1 overflow-y-auto p-4">
        <button
          type="button"
          onClick={handleNewConversation}
          className="mb-4 flex w-full items-center gap-3 rounded-lg border border-dashed border-oow-navy-500 px-4 py-3 text-oow-gray hover:border-oow-orange hover:text-oow-white"
        >
          <Plus size={20} />
          <span>새 대화 시작하기</span>
        </button>
        {isLoading ? (
          <div className="py-8 text-center text-oow-gray">로딩 중...</div>
        ) : conversations?.length === 0 ? (
          <div className="py-8 text-center text-oow-gray">
            <MessageSquare size={48} className="mx-auto mb-2 opacity-50" />
            <p>대화 기록이 없습니다</p>
          </div>
        ) : (
          <div className="space-y-2">
            {conversations?.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                onClick={() => handleSelectConversation(conversation.id)}
                className={`group flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-colors ${
                  currentConversationId === conversation.id
                    ? "bg-oow-orange text-oow-navy-900"
                    : "bg-oow-navy-700 text-oow-white hover:bg-oow-navy-600"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{conversation.title}</p>
                  <p className="text-xs opacity-70">
                    {new Date(conversation.createdAt).toLocaleDateString("ko-KR")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleDeleteConversation(e, conversation.id)}
                  className={`ml-3 rounded p-1.5 opacity-0 transition-opacity group-hover:opacity-100 ${
                    currentConversationId === conversation.id
                      ? "hover:bg-oow-navy-900/20"
                      : "hover:bg-oow-navy-500"
                  }`}
                >
                  <Trash2 size={16} />
                </button>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
