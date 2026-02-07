export interface GuestMessage {
  role: "user" | "assistant";
  content: string;
}

export const saveGuestMessages = (messages: GuestMessage[]): void => {
  sessionStorage.setItem("oow_guest_messages", JSON.stringify(messages));
};

export const loadGuestMessages = (): GuestMessage[] => {
  const stored = sessionStorage.getItem("oow_guest_messages");

  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (message): message is GuestMessage =>
        typeof message.role === "string" &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string",
    );
  } catch {
    return [];
  }
};

export const clearGuestMessages = (): void => {
  sessionStorage.removeItem("oow_guest_messages");
};

export const hasGuestMessages = (): boolean => {
  try {
    const stored = sessionStorage.getItem("oow_guest_messages");

    if (!stored) {
      return false;
    }

    const messages = JSON.parse(stored) as GuestMessage[];

    return messages.length > 0;
  } catch {
    return false;
  }
};
