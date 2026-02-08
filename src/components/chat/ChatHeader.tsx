import { Menu } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { useChatStore } from "../../stores/chatStore";
import { IconButton } from "../ui/IconButton";
import { ChatPanelHeader } from "./ChatPanelHeader";

interface ChatHeaderProps {
  headerTitle: string;
}

export const ChatHeader = ({ headerTitle }: ChatHeaderProps) => {
  const user = useAuthStore((state) => state.user);
  const openConversationList = useChatStore((state) => state.openConversationList);
  const closeAISidePanel = useChatStore((state) => state.closeAISidePanel);

  return (
    <ChatPanelHeader
      title={headerTitle}
      onClose={closeAISidePanel}
      leftAction={
        user ? (
          <IconButton onClick={openConversationList} size="sm">
            <Menu size={20} />
          </IconButton>
        ) : null
      }
    />
  );
};
