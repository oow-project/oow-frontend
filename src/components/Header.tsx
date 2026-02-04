import { Bot } from "lucide-react";
import { Link } from "react-router";
import { useAuthStore } from "../stores/authStore";
import { useChatStore } from "../stores/chatStore";

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const signOut = useAuthStore((state) => state.signOut);
  const openLoginModal = useAuthStore((state) => state.openLoginModal);
  const openAISidePanel = useChatStore((state) => state.openAISidePanel);

  return (
    <header
      className="
        flex items-center justify-between
        px-4 py-3 md:px-6 md:py-4
        bg-oow-navy-900
      "
    >
      <Link to="/">
        <h1 className="text-lg md:text-xl font-bold text-oow-white">OOW.GG</h1>
      </Link>
      <div className="flex items-center gap-2 md:gap-3">
        {isLoading ? (
          <div className="h-8 w-16 animate-pulse rounded bg-oow-navy-600" />
        ) : user ? (
          <button
            onClick={signOut}
            className="
              flex items-center gap-1
              px-2 py-1.5 md:px-3 md:py-2
              rounded bg-oow-navy-600
              text-xs md:text-sm font-medium text-oow-white
              cursor-pointer hover:opacity-80
            "
          >
            <span>로그아웃</span>
          </button>
        ) : (
          <button
            onClick={openLoginModal}
            className="
              flex items-center gap-1
              px-2 py-1.5 md:px-3 md:py-2
              rounded bg-oow-navy-600
              text-xs md:text-sm font-medium text-oow-white
              cursor-pointer hover:opacity-80
            "
          >
            <span>로그인</span>
          </button>
        )}
        <button
          onClick={openAISidePanel}
          className="
            flex items-center gap-1
            px-2 py-1.5 md:px-3 md:py-2
            rounded bg-oow-orange
            text-xs md:text-sm font-medium text-oow-navy-900
            cursor-pointer 
          "
        >
          <Bot size={16} className="md:hidden" />
          <Bot size={20} className="hidden md:block" />
          <span>AI 코치</span>
        </button>
      </div>
    </header>
  );
};
