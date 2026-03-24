import { Bot, Moon, Sun } from "lucide-react";
import { Link } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { useChatStore } from "../../stores/chatStore";
import { useThemeStore } from "../../stores/themeStore";
import { Button } from "../ui/Button";
import { IconButton } from "../ui/IconButton";

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const signOut = useAuthStore((state) => state.signOut);
  const openLoginModal = useAuthStore((state) => state.openLoginModal);
  const openAISidePanel = useChatStore((state) => state.openAISidePanel);
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

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
        <IconButton variant="ghost" size="md" onClick={toggleTheme} aria-label="테마 전환">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </IconButton>
        {isLoading ? (
          <div className="h-8 w-16 animate-pulse rounded bg-oow-navy-600" />
        ) : user ? (
          <Button variant="secondary" size="sm" onClick={signOut}>
            로그아웃
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onClick={openLoginModal}>
            로그인
          </Button>
        )}
        <Button variant="primary" size="sm" onClick={openAISidePanel}>
          <Bot size={16} className="md:hidden" />
          <Bot size={20} className="hidden md:block" />
          <span>AI 코치</span>
        </Button>
      </div>
    </header>
  );
};
