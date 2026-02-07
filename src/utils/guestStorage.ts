const STORAGE_KEY = "oow_guest_messages";

export interface GuestMessage {
  role: "user" | "assistant";
  content: string;
}

export const saveGuestMessages = (messages: GuestMessage[]): void => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
};

export const loadGuestMessages = (): GuestMessage[] => {
  const stored = sessionStorage.getItem(STORAGE_KEY);

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
  sessionStorage.removeItem(STORAGE_KEY);
};

export const hasGuestMessages = (): boolean => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return false;
    }

    const messages = JSON.parse(stored) as GuestMessage[];

    return messages.length > 0;
  } catch {
    return false;
  }
};
