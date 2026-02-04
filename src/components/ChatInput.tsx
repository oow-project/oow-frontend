import { useState } from "react";
import { useChatStore } from "../stores/chatStore";

interface ChatInputProps {
  onSubmitMessage: (message: string) => void;
}

export const ChatInput = ({ onSubmitMessage }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const isLoadingResponse = useChatStore((state) => state.isLoadingResponse);
  const trimmedInputValue = inputValue.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!trimmedInputValue) return;

    onSubmitMessage(trimmedInputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
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
  );
};
