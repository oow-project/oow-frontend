import { create } from "zustand";

import type { ChatStore } from "../types/chat";

const initialState = {
  isAISidePanelOpen: false,
  currentConversationId: null,
  messages: [],
  streamingContent: "",
  analysisCard: null,
  isLoadingResponse: false,
};

export const useChatStore = create<ChatStore>((set) => ({
  ...initialState,

  openAISidePanel: () => set({ isAISidePanelOpen: true }),
  closeAISidePanel: () => set({ isAISidePanelOpen: false }),

  setCurrentConversationId: (conversationId) => set({ currentConversationId: conversationId }),

  setMessages: (messages) => set({ messages }),

  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),

  setStreamingContent: (content) => set({ streamingContent: content }),

  setAnalysisCard: (card) => set({ analysisCard: card }),

  setIsLoadingResponse: (isLoading) => set({ isLoadingResponse: isLoading }),

  resetChat: () => set(initialState),
}));
