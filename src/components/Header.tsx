import { Bot } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-oow-navy-900">
      <a href="/">
        <h1 className="text-xl font-bold text-oow-white">OOW.GG</h1>
      </a>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1 px-3 py-2 rounded bg-oow-navy-600 text-sm font-medium text-oow-white">
          <span>로그인</span>
        </button>
        <button className="flex items-center gap-1 px-3 py-2 rounded bg-oow-orange text-sm font-medium text-oow-navy-900">
          <Bot size={20} />
          <span>AI 코치</span>
        </button>
      </div>
    </header>
  );
};
