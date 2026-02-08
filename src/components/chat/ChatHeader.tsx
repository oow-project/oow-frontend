import { X, Menu } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { useChatStore } from "../../stores/chatStore";
import { IconButton } from "../ui/IconButton";

interface ChatHeaderProps {
  headerTitle: string;
}

export const ChatHeader = ({ headerTitle }: ChatHeaderProps) => {
  const user = useAuthStore((state) => state.user);
  const openConversationList = useChatStore((state) => state.openConversationList);
  const closeAISidePanel = useChatStore((state) => state.closeAISidePanel);

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-oow-navy-600">
      <div className="flex items-center gap-2">
        {user ? (
          <IconButton onClick={openConversationList} size="sm">
            <Menu size={20} />
          </IconButton>
        ) : null}
        <span className="max-w-[280px] truncate text-lg font-bold text-oow-white">
          {headerTitle}
        </span>
      </div>
      <IconButton variant="secondary" size="sm" onClick={closeAISidePanel} className="bg-oow-gray">
        <X size={20} />
      </IconButton>
    </header>
  );
};
