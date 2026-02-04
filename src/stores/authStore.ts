import { create } from "zustand";
import { supabase } from "../lib/supabase";

import type { AuthStore } from "../types/auth";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  isLoginModalOpen: false,

  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
