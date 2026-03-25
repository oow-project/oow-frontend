import type { HeroRole } from "./hero";

export interface ChatMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

export interface ToolStatus {
  tool: string;
  status: "running" | "complete";
}

export interface AnalysisCard {
  heroKey: string;
  heroName: string;
  heroRole: HeroRole;
  winrate: number;
  pickrate: number;
}

export interface ChatStore {
  isAISidePanelOpen: boolean;
  currentConversationId: string | null;
  localMessages: ChatMessage[];
  streamingContent: string;
  analysisCard: AnalysisCard | null;
  isLoadingResponse: boolean;
  isConversationListOpen: boolean;
  rateLimitResetAfter: number | null;
  toolStatuses: ToolStatus[];

  openAISidePanel: () => void;
  closeAISidePanel: () => void;
  setCurrentConversationId: (conversationId: string | null) => void;
  setLocalMessages: (messages: ChatMessage[]) => void;
  addLocalMessage: (message: ChatMessage) => void;
  clearLocalMessages: () => void;
  setStreamingContent: (content: string) => void;
  setAnalysisCard: (card: AnalysisCard | null) => void;
  setIsLoadingResponse: (isLoading: boolean) => void;
  openConversationList: () => void;
  closeConversationList: () => void;
  setRateLimitResetAfter: (seconds: number | null) => void;
  addToolStart: (tool: string) => void;
  setToolComplete: (tool: string) => void;
  clearToolStatuses: () => void;
  resetChat: () => void;
  resetChatContent: () => void;
}
