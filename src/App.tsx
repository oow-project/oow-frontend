import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { supabase } from "./lib/supabase";
import { queryClient } from "./lib/queryClient";
import { useAuthStore } from "./stores/authStore";
import { useChatStore } from "./stores/chatStore";
import { hasGuestMessages, loadGuestMessages, clearGuestMessages } from "./utils/guestStorage";
import { migrateConversation } from "./api/conversation";
import { QUERY_KEYS } from "./constants/queryKeys";

export const App = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session ? session.user : null);
      setIsLoading(false);

      if (window.location.href.includes("#")) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session ? session.user : null);

      if (event === "SIGNED_OUT") {
        useChatStore.getState().resetChatContent();
      }

      if (event === "SIGNED_IN" && hasGuestMessages()) {
        const messages = loadGuestMessages();

        try {
          const conversation = await migrateConversation(messages);

          clearGuestMessages();

          useChatStore.getState().setCurrentConversationId(conversation.id);
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.conversations });
        } catch (error) {
          console.error("마이그레이션 실패:", error);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <RouterProvider router={router} />;
};
