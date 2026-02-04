import type { User } from "@supabase/supabase-js";

export interface AuthStore {
  user: User | null;
  isLoading: boolean;
  isLoginModalOpen: boolean;

  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  signOut: () => Promise<void>;
}
