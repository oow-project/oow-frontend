import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { GoogleLogo } from "./GoogleIcon";
import { useAuthStore } from "../../stores/authStore";
import { Button } from "../ui/Button";
import { ErrorMessage } from "../ui/ErrorMessage";

export const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLoginModalOpen = useAuthStore((state) => state.isLoginModalOpen);
  const closeLoginModal = useAuthStore((state) => state.closeLoginModal);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeLoginModal();
    }
  };

  if (!isLoginModalOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-sm rounded-3xl bg-oow-navy-800 p-6">
        <div className="p-15 text-center">
          <p className="mb-1 text-xl text-oow-white font-bold">나만의 AI 오버워치 코치</p>
          <span className="text-xl text-oow-gray font-bold">OOW.GG 계정에 로그인</span>
        </div>
        {error ? <ErrorMessage message={error} className="mb-4 text-center" /> : null}
        <Button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          isLoading={isLoading}
          variant="light"
          className="w-full gap-2 py-3"
        >
          {isLoading ? null : (
            <>
              <GoogleLogo />
              <span>Google 계정으로 계속하기</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
