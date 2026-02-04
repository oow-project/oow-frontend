import { create } from "zustand";

import type { ChatStore } from "../types/chat";

const initialState = {
  isAISidePanelOpen: false,
  currentConversationId: null,
  localMessages: [],
  streamingContent: "",
  analysisCard: null,
  isLoadingResponse: false,
  isConversationListOpen: false,
  rateLimitResetAfter: null,
};

export const useChatStore = create<ChatStore>((set) => ({
  ...initialState,
  openAISidePanel: () => set({ isAISidePanelOpen: true }),
  closeAISidePanel: () => set({ isAISidePanelOpen: false }),

  setCurrentConversationId: (conversationId) => set({ currentConversationId: conversationId }),

  setLocalMessages: (messages) => set({ localMessages: messages }),
  addLocalMessage: (message) =>
    set((state) => ({
      localMessages: [...state.localMessages, message],
    })),
  clearLocalMessages: () => set({ localMessages: [] }),

  setStreamingContent: (content) => set({ streamingContent: content }),
  setAnalysisCard: (card) => set({ analysisCard: card }),
  setIsLoadingResponse: (isLoading) => set({ isLoadingResponse: isLoading }),

  openConversationList: () => set({ isConversationListOpen: true }),
  closeConversationList: () => set({ isConversationListOpen: false }),

  setRateLimitResetAfter: (seconds) => set({ rateLimitResetAfter: seconds }),

  resetChat: () =>
    set({
      ...initialState,
      isAISidePanelOpen: true,
    }),
}));
