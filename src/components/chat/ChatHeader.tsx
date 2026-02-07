import { X, Menu } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { useChatStore } from "../../stores/chatStore";

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
  );
};
