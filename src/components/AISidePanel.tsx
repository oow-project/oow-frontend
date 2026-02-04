import { useState } from "react";
import { X, Menu, AlertTriangle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { sendChatMessage, RateLimitError } from "../api/chat";
import { toChatMessage } from "../api/conversation";
import { useChatStore } from "../stores/chatStore";
import { useAuthStore } from "../stores/authStore";
import { useConversations, useConversationMessages } from "../hooks/useConversations";
import { ChatMessage } from "./ChatMessage";
import { ConversationList } from "./ConversationList";
import { AnalysisCard } from "./AnalysisCard";

export const AISidePanel = () => {
  const [inputValue, setInputValue] = useState("");

  const user = useAuthStore((state) => state.user);

  const isAISidePanelOpen = useChatStore((state) => state.isAISidePanelOpen);
  const closeAISidePanel = useChatStore((state) => state.closeAISidePanel);
  const currentConversationId = useChatStore((state) => state.currentConversationId);
  const pendingMessages = useChatStore((state) => state.pendingMessages);
  const streamingContent = useChatStore((state) => state.streamingContent);
  const isLoadingResponse = useChatStore((state) => state.isLoadingResponse);

  const addPendingMessage = useChatStore((state) => state.addPendingMessage);
  const clearPendingMessages = useChatStore((state) => state.clearPendingMessages);
  const setStreamingContent = useChatStore((state) => state.setStreamingContent);
  const setIsLoadingResponse = useChatStore((state) => state.setIsLoadingResponse);
  const setCurrentConversationId = useChatStore((state) => state.setCurrentConversationId);
  const openConversationList = useChatStore((state) => state.openConversationList);
  const rateLimitResetAfter = useChatStore((state) => state.rateLimitResetAfter);
  const setRateLimitResetAfter = useChatStore((state) => state.setRateLimitResetAfter);
  const analysisCard = useChatStore((state) => state.analysisCard);
  const setAnalysisCard = useChatStore((state) => state.setAnalysisCard);

  const queryClient = useQueryClient();

  const { data: conversations } = useConversations();
  const { data: serverMessages } = useConversationMessages(currentConversationId);

  const currentConversation = conversations?.find((c) => c.id === currentConversationId);
  const headerTitle = currentConversation?.title ?? "새 대화";

  const displayMessages = currentConversationId
    ? [...(serverMessages?.map(toChatMessage) ?? []), ...pendingMessages]
    : pendingMessages;

  const trimmedInputValue = inputValue.trim();

  const handleSubmitMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!trimmedInputValue) return;

    setIsLoadingResponse(true);

    addPendingMessage({
      role: "user",
      content: trimmedInputValue,
      createdAt: new Date(),
    });

    setInputValue("");

    await sendChatMessage(
      {
        message: trimmedInputValue,
        conversationId: currentConversationId ?? undefined,
      },
      {
        onChunk: (chunk) => {
          const currentContent = useChatStore.getState().streamingContent;
          setStreamingContent(currentContent + chunk);
        },
        onComplete: () => {
          const finalContent = useChatStore.getState().streamingContent;

          addPendingMessage({
            role: "assistant",
            content: finalContent,
            createdAt: new Date(),
          });

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
        onMeta: (meta) => {
          setCurrentConversationId(meta.conversationId);
          clearPendingMessages();
          queryClient.invalidateQueries({ queryKey: ["conversations"] });
          queryClient.invalidateQueries({
            queryKey: ["conversations", meta.conversationId, "messages"],
          });
        },
      },
    );
  };

  const handleSuggestionSelect = async (question: string) => {
    setAnalysisCard(null);
    setIsLoadingResponse(true);

    addPendingMessage({
      role: "user",
      content: question,
      createdAt: new Date(),
    });

    await sendChatMessage(
      {
        message: question,
        conversationId: currentConversationId ?? undefined,
      },
      {
        onChunk: (chunk) => {
          const currentContent = useChatStore.getState().streamingContent;
          setStreamingContent(currentContent + chunk);
        },
        onComplete: () => {
          const finalContent = useChatStore.getState().streamingContent;

          addPendingMessage({
            role: "assistant",
            content: finalContent,
            createdAt: new Date(),
          });

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
        onMeta: (meta) => {
          setCurrentConversationId(meta.conversationId);
          clearPendingMessages();
          queryClient.invalidateQueries({ queryKey: ["conversations"] });
          queryClient.invalidateQueries({
            queryKey: ["conversations", meta.conversationId, "messages"],
          });
        },
      },
    );
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
      <header className="flex items-center justify-between px-4 py-3 border-b border-oow-navy-600">
        <div className="flex items-center gap-2">
          {user ? (
            <button
              type="button"
              onClick={openConversationList}
              className="rounded p-1 text-oow-gray hover:bg-oow-navy-600 hover:text-oow-white"
            >
              <Menu size={20} />
            </button>
          ) : null}
          <span className="max-w-[280px] truncate text-lg font-bold text-oow-white">
            {headerTitle}
          </span>
        </div>
        <button type="button" onClick={closeAISidePanel} className="p-1 rounded bg-oow-gray">
          <X size={20} />
        </button>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {displayMessages.map((message, index) => (
          <ChatMessage key={message.id ?? `pending-${index}`} message={message} />
        ))}
        {streamingContent ? (
          <ChatMessage
            message={{
              role: "assistant",
              content: streamingContent,
              createdAt: new Date(),
            }}
          />
        ) : null}
        {analysisCard ? (
          <AnalysisCard card={analysisCard} onSuggestionClick={handleSuggestionSelect} />
        ) : null}
      </div>
      <footer className="border-t border-oow-navy-600 p-4">
        {rateLimitResetAfter !== null ? (
          <div
            className="animate-fade-out-up mb-3 flex items-center gap-2 rounded-lg bg-red-700 px-3 py-2 text-sm text-oow-white "
            onAnimationEnd={() => setRateLimitResetAfter(null)}
          >
            <AlertTriangle size={16} />
            <span>
              요청 한도를 초과했습니다.
              {rateLimitResetAfter > 0
                ? ` ${Math.floor(rateLimitResetAfter / 3600)}시간 ${Math.floor((rateLimitResetAfter % 3600) / 60)}분 후 다시 이용 가능합니다.`
                : " 잠시 후 다시 시도해주세요."}
            </span>
          </div>
        ) : null}
        <form onSubmit={handleSubmitMessage} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="질문을 입력하세요..."
            disabled={isLoadingResponse}
            className="flex-1 rounded-lg bg-oow-navy-600 px-3 py-2 text-sm text-oow-white placeholder:text-oow-gray focus:outline-none"
          />
          <button
            type="submit"
            disabled={!trimmedInputValue || isLoadingResponse}
            className="rounded-lg bg-oow-orange px-4 py-2 text-sm font-medium text-oow-navy-900 disabled:opacity-50"
          >
            전송
          </button>
        </form>
      </footer>
      <ConversationList />
    </aside>
  );
};
