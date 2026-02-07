import { api } from "./client";

import type { ChatMessage } from "../types/chat";

export interface Conversation {
  id: string;
  title: string;
  tag: string;
  createdAt: string;
}

export interface ConversationMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

interface ConversationListResponse {
  conversations: Conversation[];
  total: number;
}

interface MessagesResponse {
  messages: ConversationMessage[];
  total: number;
}

interface MigrateMessage {
  role: "user" | "assistant";
  content: string;
}

export const toChatMessage = (message: ConversationMessage): ChatMessage => ({
  id: message.id,
  role: message.role,
  content: message.content,
  createdAt: new Date(message.createdAt),
});

export const getConversations = async (): Promise<Conversation[]> => {
  const response = await api.get("api/conversations").json<ConversationListResponse>();

  return response.conversations;
};

export const getConversationMessages = async (
  conversationId: string,
): Promise<ConversationMessage[]> => {
  const response = await api
    .get(`api/conversations/${conversationId}/messages`)
    .json<MessagesResponse>();

  return response.messages;
};

export const deleteConversation = async (conversationId: string): Promise<void> => {
  await api.delete(`api/conversations/${conversationId}`);
};

export const migrateConversation = async (messages: MigrateMessage[]): Promise<Conversation> => {
  const response = await api
    .post("api/conversations/migrate", {
      json: { messages, tag: "general" },
    })
    .json<Conversation>();

  return response;
};
