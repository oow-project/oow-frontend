import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getConversations, getConversationMessages, deleteConversation } from "../api/conversation";
import { useAuthStore } from "../stores/authStore";

export const useConversations = () => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
    staleTime: 1000 * 60 * 5,
    enabled: !!user,
  });
};

export const useConversationMessages = (conversationId: string | null) => {
  return useQuery({
    queryKey: ["conversations", conversationId, "messages"],
    queryFn: () => getConversationMessages(conversationId!),
    enabled: !!conversationId,
  });
};

export const useDeleteConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};

export const useInvalidateConversations = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ["conversations"] });
  };
};
