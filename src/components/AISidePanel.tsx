import { X } from "lucide-react";
import { useChatStore } from "../stores/chatStore";

export const AISidePanel = () => {
  const isAISidePanelOpen = useChatStore((state) => state.isAISidePanelOpen);
  const closeAISidePanel = useChatStore((state) => state.closeAISidePanel);

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
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-oow-gray text-sm">채팅 영역</p>
      </div>
      <footer className="border-t border-oow-navy-600 p-4">
        <p className="text-oow-gray text-sm">입력창</p>
      </footer>
    </aside>
  );
};
