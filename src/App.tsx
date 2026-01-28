import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { supabase } from "./lib/supabase";
import { useAuthStore } from "./stores/authStore";

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
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? session.user : null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <RouterProvider router={router} />;
};
