import { useState } from "react";
import { X } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { useChatStore } from "../stores/chatStore";
import { sendChatMessage } from "../api/chat";

export const AISidePanel = () => {
  const [inputValue, setInputValue] = useState("");

  const isAISidePanelOpen = useChatStore((state) => state.isAISidePanelOpen);
  const closeAISidePanel = useChatStore((state) => state.closeAISidePanel);
  const messages = useChatStore((state) => state.messages);
  const streamingContent = useChatStore((state) => state.streamingContent);
  const addMessage = useChatStore((state) => state.addMessage);
  const setStreamingContent = useChatStore((state) => state.setStreamingContent);
  const isLoadingResponse = useChatStore((state) => state.isLoadingResponse);
  const setIsLoadingResponse = useChatStore((state) => state.setIsLoadingResponse);

  const trimmedInputValue = inputValue.trim();

  const handleSubmitMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!trimmedInputValue) return;

    setIsLoadingResponse(true);

    addMessage({
      role: "user",
      content: trimmedInputValue,
      createdAt: new Date(),
    });

    setInputValue("");

    await sendChatMessage(
      { message: trimmedInputValue },
      {
        onChunk: (chunk) => {
          const currentContent = useChatStore.getState().streamingContent;

          setStreamingContent(currentContent + chunk);
        },
        onComplete: () => {
          const finalContent = useChatStore.getState().streamingContent;

          addMessage({
            role: "assistant",
            content: finalContent,
            createdAt: new Date(),
          });

          setStreamingContent("");
          setIsLoadingResponse(false);
        },
        onError: (error) => {
          console.error("Chat error:", error);
          setIsLoadingResponse(false);
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
        <span className="text-lg font-bold text-oow-white">AI 코치</span>
        <button onClick={closeAISidePanel} className="p-1 rounded bg-oow-gray">
          <X size={20} />
        </button>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id || message.createdAt.toString()} message={message} />
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
      </div>
      <footer className="border-t border-oow-navy-600 p-4">
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
    </aside>
  );
};
