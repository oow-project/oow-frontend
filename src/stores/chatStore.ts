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
  toolStatuses: [],
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

  addToolStart: (tool) =>
    set((state) => ({
      toolStatuses: [...state.toolStatuses, { tool, status: "running" as const }],
    })),
  setToolComplete: (tool) =>
    set((state) => ({
      toolStatuses: state.toolStatuses.map((toolStatus) =>
        toolStatus.tool === tool && toolStatus.status === "running"
          ? { ...toolStatus, status: "complete" as const }
          : toolStatus,
      ),
    })),
  clearToolStatuses: () => set({ toolStatuses: [] }),

  resetChat: () =>
    set({
      ...initialState,
      isAISidePanelOpen: true,
    }),

  resetChatContent: () =>
    set((state) => ({
      ...initialState,
      isAISidePanelOpen: state.isAISidePanelOpen,
    })),
}));
