import { create } from "zustand";

import type { ChatStore } from "../types/chat";

const initialState = {
  isAISidePanelOpen: false,
  currentConversationId: null,
  pendingMessages: [],
  streamingContent: "",
  analysisCard: null,
  isLoadingResponse: false,
  isConversationListOpen: false,
};

export const useChatStore = create<ChatStore>((set) => ({
  ...initialState,
  openAISidePanel: () => set({ isAISidePanelOpen: true }),
  closeAISidePanel: () => set({ isAISidePanelOpen: false }),

  setCurrentConversationId: (conversationId) => set({ currentConversationId: conversationId }),

  setPendingMessages: (messages) => set({ pendingMessages: messages }),
  addPendingMessage: (message) =>
    set((state) => ({
      pendingMessages: [...state.pendingMessages, message],
    })),
  clearPendingMessages: () => set({ pendingMessages: [] }),

  setStreamingContent: (content) => set({ streamingContent: content }),
  setAnalysisCard: (card) => set({ analysisCard: card }),
  setIsLoadingResponse: (isLoading) => set({ isLoadingResponse: isLoading }),

  openConversationList: () => set({ isConversationListOpen: true }),
  closeConversationList: () => set({ isConversationListOpen: false }),

  resetChat: () =>
    set({
      ...initialState,
      isAISidePanelOpen: true,
    }),
}));
