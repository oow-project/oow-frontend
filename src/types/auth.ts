import type { User } from "@supabase/supabase-js";

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface AuthStore {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  signOut: () => Promise<void>;
}
