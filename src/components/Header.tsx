import { Bot } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-oow-navy-900 flex items-center justify-between px-6 py-4">
      <a href="/">
        <h1 className="text-oow-white text-xl font-bold">OOW.GG</h1>
      </a>
      <div className="flex items-center gap-3">
        <button className="bg-oow-navy-600 text-oow-white flex items-center gap-1 rounded px-3 py-2 text-sm font-medium">
          <span>로그인</span>
        </button>
        <button className="bg-oow-orange text-oow-navy-900 flex items-center gap-1 rounded px-3 py-2 text-sm font-medium">
          <Bot size={20} />
          <span>AI 코치</span>
        </button>
      </div>
    </header>
  );
};
