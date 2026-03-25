import { useAuthStore } from "../../stores/authStore";
import { useChatStore } from "../../stores/chatStore";
import { useChatDisplayMessages } from "../../hooks/useChatDisplayMessages";
import { useAutoScroll } from "../../hooks/useAutoScroll";
import { ChatMessage as ChatMessageComponent } from "./ChatMessage";
import { ToolStatusList } from "./ToolStatusList";
import { AnalysisCard } from "./AnalysisCard";

interface ChatBodyProps {
  onSuggestionSelect: (question: string) => void;
}

export const ChatBody = ({ onSuggestionSelect }: ChatBodyProps) => {
  const user = useAuthStore((state) => state.user);
  const streamingContent = useChatStore((state) => state.streamingContent);
  const isLoadingResponse = useChatStore((state) => state.isLoadingResponse);
  const analysisCard = useChatStore((state) => state.analysisCard);
  const toolStatuses = useChatStore((state) => state.toolStatuses);
  const displayMessages = useChatDisplayMessages();
  const scrollContainerRef = useAutoScroll(displayMessages, streamingContent);

  return (
    <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {!user && displayMessages.length > 0 ? (
        <div className="mb-4 text-sm p-1 bg-amber-300 text-center text-oow-black">
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
        toolStatuses.length > 0 ? (
          <ToolStatusList />
        ) : (
          <ChatMessageComponent
            message={{ role: "assistant", content: "", createdAt: new Date() }}
            isLoading
          />
        )
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
        <AnalysisCard card={analysisCard} onSuggestionClick={onSuggestionSelect} />
      ) : null}
    </div>
  );
};
