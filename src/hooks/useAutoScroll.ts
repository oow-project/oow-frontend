import { useEffect, useRef } from "react";

import type { ChatMessage } from "../types/chat";

export const useAutoScroll = (displayMessages: ChatMessage[], streamingContent: string) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
