import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroceryItem } from "../data/grocery.apis";

export const useDeleteGroceryItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGroceryItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["grocery"] }),
  });
};
