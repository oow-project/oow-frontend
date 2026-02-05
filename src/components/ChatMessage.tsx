import Markdown from "react-markdown";
import type { ChatMessage as ChatMessageType } from "../types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
  isLoading?: boolean;
}

export const ChatMessage = ({ message, isLoading = false }: ChatMessageProps) => {
  const isUserMessage = message.role === "user";

  if (isUserMessage) {
    return (
      <div className="flex justify-end">
        <p className="max-w-full rounded-lg bg-oow-orange px-3 py-2 text-oow-navy-900">
          {message.content}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-start">
        <div className="flex gap-1.5 rounded-lg bg-oow-navy-600 px-4 py-3">
          <span className="h-2 w-2 animate-bounce rounded-full bg-oow-gray" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-oow-gray [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-oow-gray [animation-delay:300ms]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <article className="prose prose-sm prose-invert max-w-full rounded-lg bg-oow-navy-600 px-3 py-2 wrap-break-word">
        <Markdown>{message.content}</Markdown>
      </article>
    </div>
  );
};
