import type { HeroRole } from "./hero";

export interface ChatMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

export interface AnalysisCard {
  heroKey: string;
  heroName: string;
  heroPortrait: string;
  heroRole: HeroRole;
  winrate: number;
  pickrate: number;
}

export interface ChatStore {
  isAISidePanelOpen: boolean;
  currentConversationId: string | null;
  pendingMessages: ChatMessage[];
  streamingContent: string;
  analysisCard: AnalysisCard | null;
  isLoadingResponse: boolean;
  isConversationListOpen: boolean;

  openAISidePanel: () => void;
  closeAISidePanel: () => void;
  setCurrentConversationId: (conversationId: string | null) => void;
  setPendingMessages: (messages: ChatMessage[]) => void;
  addPendingMessage: (message: ChatMessage) => void;
  clearPendingMessages: () => void;
  setStreamingContent: (content: string) => void;
  setAnalysisCard: (card: AnalysisCard | null) => void;
  setIsLoadingResponse: (isLoading: boolean) => void;
  openConversationList: () => void;
  closeConversationList: () => void;
  resetChat: () => void;
}
