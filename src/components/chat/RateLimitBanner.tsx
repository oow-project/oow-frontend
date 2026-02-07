import { useAuthStore } from "../../stores/authStore";
import { useChatStore } from "../../stores/chatStore";
import { CHAT_MESSAGES } from "../../constants/messages";

export const RateLimitBanner = () => {
  const user = useAuthStore((state) => state.user);
  const rateLimitResetAfter = useChatStore((state) => state.rateLimitResetAfter);
  const setRateLimitResetAfter = useChatStore((state) => state.setRateLimitResetAfter);

  if (rateLimitResetAfter === null) {
    return null;
  }

  return (
    <div
      className="animate-fade-out-up mb-3 flex flex-col gap-2 rounded-lg bg-red-700 px-3 py-2 text-sm text-oow-navy-700 font-bold"
      onAnimationEnd={() => setRateLimitResetAfter(null)}
    >
      <p>
        {CHAT_MESSAGES.RATE_LIMIT}
        {rateLimitResetAfter > 0
          ? ` ${Math.floor(rateLimitResetAfter / 3600)}시간 ${Math.floor((rateLimitResetAfter % 3600) / 60)}분 후 다시 이용 가능합니다.`
          : " 잠시 후 다시 시도해주세요."}
      </p>
      {!user ? <p>로그인하면 더 많은 혜택을 누릴 수 있습니다.</p> : null}
    </div>
  );
};
