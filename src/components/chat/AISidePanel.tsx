import { useRef, useEffect } from "react";
import { X, Menu } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { sendChatMessage, RateLimitError } from "../../api/chat";
import { saveGuestMessages, loadGuestMessages } from "../../utils/guestStorage";
import { useChatStore } from "../../stores/chatStore";
import { useAuthStore } from "../../stores/authStore";
import { useConversations } from "../../hooks/useConversations";
import { useChatDisplayMessages } from "../../hooks/useChatDisplayMessages";
import { useAutoScroll } from "../../hooks/useAutoScroll";
import { ChatMessage as ChatMessageComponent } from "./ChatMessage";
import { ConversationList } from "./ConversationList";
import { AnalysisCard } from "./AnalysisCard";
import { ChatInput } from "./ChatInput";

export const AISidePanel = () => {
  const scrollContainerRef = useAutoScroll();
  const didRestoreRef = useRef(false);

  const user = useAuthStore((state) => state.user);
  const isAISidePanelOpen = useChatStore((state) => state.isAISidePanelOpen);
  const closeAISidePanel = useChatStore((state) => state.closeAISidePanel);
  const currentConversationId = useChatStore((state) => state.currentConversationId);
  const streamingContent = useChatStore((state) => state.streamingContent);
  const isLoadingResponse = useChatStore((state) => state.isLoadingResponse);

  const addLocalMessage = useChatStore((state) => state.addLocalMessage);
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
  const displayMessages = useChatDisplayMessages();

  const currentConversation = conversations?.find(
    (conversation) => conversation.id === currentConversationId,
  );
  const headerTitle = currentConversation?.title ?? "새 대화";

  useEffect(() => {
    if (didRestoreRef.current) return;
    if (user) return;
    if (displayMessages.length > 0) return;

    const savedMessages = loadGuestMessages();

    if (savedMessages.length === 0) return;

    didRestoreRef.current = true;

    savedMessages.forEach((message) => {
      addLocalMessage({
        role: message.role,
        content: message.content,
        createdAt: new Date(),
      });
    });
  }, []);

  const handleSubmitMessage = async (message: string) => {
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

  const handleSuggestionSelect = async (question: string) => {
    setAnalysisCard(null);
    setIsLoadingResponse(true);

    addLocalMessage({
      role: "user",
      content: question,
      createdAt: new Date(),
    });

    await sendChatMessage(
      {
        message: question,
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
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {!user && displayMessages.length > 0 ? (
          <div className="mb-4 text-sm p-1 bg-amber-300 text-center text-oow-navy-900">
            로그인하고 대화를 저장해 보세요.
          </div>
        ) : null}
        {displayMessages.length === 0 && !streamingContent && !analysisCard ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-center text-2xl animate-bounce bg-linear-to-r from-oow-orange to-oow-gray bg-clip-text text-transparent">
              오버워치에 관련하여 무엇이든 물어보세요
            </p>
          </div>
        ) : null}
        {displayMessages.map((message, index) => (
          <ChatMessageComponent key={message.id ?? `pending-${index}`} message={message} />
        ))}
        {isLoadingResponse && !streamingContent ? (
          <ChatMessageComponent
            message={{ role: "assistant", content: "", createdAt: new Date() }}
            isLoading
          />
        ) : null}
        {streamingContent ? (
          <ChatMessageComponent
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
            className="animate-fade-out-up mb-3 flex flex-col gap-2 rounded-lg bg-red-700 px-3 py-2 text-sm text-oow-navy-700 font-bold"
            onAnimationEnd={() => setRateLimitResetAfter(null)}
          >
            <p>
              요청 한도를 초과했습니다.
              {rateLimitResetAfter > 0
                ? ` ${Math.floor(rateLimitResetAfter / 3600)}시간 ${Math.floor((rateLimitResetAfter % 3600) / 60)}분 후 다시 이용 가능합니다.`
                : " 잠시 후 다시 시도해주세요."}
            </p>
            {!user ? <p>로그인하면 더 많은 혜택을 누릴 수 있습니다.</p> : null}
          </div>
        ) : null}
        <ChatInput onSubmitMessage={handleSubmitMessage} />
      </footer>
      <ConversationList />
    </aside>
  );
};
