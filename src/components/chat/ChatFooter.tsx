import { useSendMessage } from "../../hooks/useSendMessage";
import { ChatInput } from "./ChatInput";
import { RateLimitBanner } from "./RateLimitBanner";

export const ChatFooter = () => {
  const sendMessage = useSendMessage();

  return (
    <footer className="border-t border-oow-navy-600 p-4">
      <RateLimitBanner />
      <ChatInput onSubmitMessage={sendMessage} />
    </footer>
  );
};
