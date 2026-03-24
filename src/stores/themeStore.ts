import { create } from "zustand";

interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
}

const savedTheme = localStorage.getItem("theme");
const initialIsDark = savedTheme ? savedTheme === "dark" : true;

if (!initialIsDark) {
  document.documentElement.classList.add("light");
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isDark: initialIsDark,
  toggleTheme: () =>
    set((state) => {
      const nextIsDark = !state.isDark;

      if (nextIsDark) {
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
      }

      localStorage.setItem("theme", nextIsDark ? "dark" : "light");

      return { isDark: nextIsDark };
    }),
}));
