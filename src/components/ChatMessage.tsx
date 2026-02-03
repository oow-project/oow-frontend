import Markdown from "react-markdown";
import type { ChatMessage as ChatMessageType } from "../types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUserMessage = message.role === "user";

  if (isUserMessage) {
    return (
      <div className="flex justify-end">
        <p className="max-w-[80%] rounded-lg bg-oow-orange px-3 py-2 text-oow-navy-900">
          {message.content}
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <article className="prose prose-sm prose-invert max-w-[90%] rounded-lg bg-oow-navy-600 px-3 py-2">
        <Markdown>{message.content}</Markdown>
      </article>
    </div>
  );
};
