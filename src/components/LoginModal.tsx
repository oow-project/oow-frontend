import { useState } from "react";
import { supabase } from "../lib/supabase";
import { GoogleLogo } from "./GoogleIcon";

import type { LoginModalProps } from "../types/auth";

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
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
        {error ? <p className="mb-4 text-center text-sm text-oow-orange">{error}</p> : null}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="
            flex w-full items-center justify-center gap-2 
            py-3 
            rounded
          bg-white 
            font-medium text-gray-800 
            cursor-pointer
          "
        >
          {isLoading ? (
            <span>로그인 중...</span>
          ) : (
            <>
              <GoogleLogo />
              <span>Google 계정으로 계속하기</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
