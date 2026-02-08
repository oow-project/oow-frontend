import type { ReactNode } from "react";
import { X } from "lucide-react";
import { IconButton } from "../ui/IconButton";

interface ChatPanelHeaderProps {
  title: string;
  leftAction?: ReactNode;
  onClose: () => void;
}

export const ChatPanelHeader = ({ title, leftAction, onClose }: ChatPanelHeaderProps) => (
  <header className="flex items-center justify-between border-b border-oow-navy-600 px-4 py-3">
    <div className="flex items-center gap-2">
      {leftAction}
      <span className="max-w-[280px] truncate text-lg font-bold text-oow-white">{title}</span>
    </div>
    <IconButton variant="secondary" size="sm" onClick={onClose} className="bg-oow-gray">
      <X size={20} />
    </IconButton>
  </header>
);
