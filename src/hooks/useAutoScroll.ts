import { useEffect, useRef } from "react";

import { useChatStore } from "../stores/chatStore";
import { useChatDisplayMessages } from "./useChatDisplayMessages";

export const useAutoScroll = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const streamingContent = useChatStore((state) => state.streamingContent);
  const displayMessages = useChatDisplayMessages();

  useEffect(() => {
    const animationId = requestAnimationFrame(() => {
      if (!scrollContainerRef.current) return;

      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: streamingContent ? "auto" : "smooth",
      });
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [displayMessages, streamingContent]);

  return scrollContainerRef;
};
