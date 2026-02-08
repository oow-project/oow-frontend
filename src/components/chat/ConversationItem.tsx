import { Trash2 } from "lucide-react";
import { Button } from "../ui/Button";
import { IconButton } from "../ui/IconButton";
import type { Conversation } from "../../api/conversation";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  isDeleting: boolean;
  onSelect: (conversationId: string) => void;
  onDelete: (event: React.MouseEvent, conversationId: string) => void;
}

export const ConversationItem = ({
  conversation,
  isSelected,
  isDeleting,
  onSelect,
  onDelete,
}: ConversationItemProps) => (
  <li
    className={`group flex w-full items-center justify-between rounded-lg transition-colors ${
      isSelected ? "bg-oow-orange" : "bg-oow-navy-700 hover:bg-oow-navy-600"
    }`}
  >
    <Button
      type="button"
      variant="ghost"
      onClick={() => onSelect(conversation.id)}
      className="flex w-full min-w-0 flex-1 items-center justify-between px-4 py-3 text-left text-oow-white hover:bg-transparent"
    >
      <span className="block min-w-0 flex-1">
        <span className="block truncate font-medium">{conversation.title}</span>
        <span className="block text-xs opacity-70">
          {new Date(conversation.createdAt).toLocaleDateString("ko-KR")}
        </span>
      </span>
    </Button>
    <IconButton
      onClick={(event) => onDelete(event, conversation.id)}
      disabled={isDeleting}
      className={`mr-3 opacity-0 transition-opacity group-hover:opacity-100 ${
        isSelected ? "hover:bg-oow-navy-900/20" : "hover:bg-oow-navy-500"
      }`}
    >
      <Trash2 size={16} />
    </IconButton>
  </li>
);
