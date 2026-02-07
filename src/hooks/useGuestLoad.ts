import { useEffect, useRef } from "react";

import { useChatStore } from "../stores/chatStore";
import { useAuthStore } from "../stores/authStore";
import { loadGuestMessages } from "../utils/guestStorage";
import { useChatDisplayMessages } from "./useChatDisplayMessages";

export const useGuestLoad = () => {
  const didRestoreRef = useRef(false);
  const user = useAuthStore((state) => state.user);
  const addLocalMessage = useChatStore((state) => state.addLocalMessage);
  const displayMessages = useChatDisplayMessages();

  useEffect(() => {
    if (didRestoreRef.current) return;
    if (user) return;
    if (displayMessages.length > 0) return;

    const savedMessages = loadGuestMessages();

    if (savedMessages.length === 0) return;

    didRestoreRef.current = true;

    savedMessages.forEach((message) => {
      addLocalMessage({
        role: message.role,
        content: message.content,
        createdAt: new Date(),
      });
    });
  }, []);
};
