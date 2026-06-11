import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearPurchasedItems } from "../data/grocery.apis";

export const useClearItems = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearPurchasedItems,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["grocery"] }),
    onError: (error) => {
      console.error("Failed to clear purchased items:", error);
    },
  });
};
