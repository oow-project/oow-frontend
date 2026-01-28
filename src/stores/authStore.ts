import { create } from "zustand";
import { supabase } from "../lib/supabase";

import type { AuthStore } from "../types/auth";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
