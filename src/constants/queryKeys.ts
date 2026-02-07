export const QUERY_KEYS = {
  conversations: ["conversations"] as const,
  conversationMessages: (conversationId: string) =>
    ["conversations", conversationId, "messages"] as const,
  heroes: ["heroes"] as const,
  hero: (heroKey: string) => ["hero", heroKey] as const,
  heroStats: (filters: unknown) => ["heroStats", filters] as const,
} as const;
