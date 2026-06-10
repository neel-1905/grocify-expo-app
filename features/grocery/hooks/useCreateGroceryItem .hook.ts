import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroceryItem } from "../data/grocery.apis";

export const useCreateGroceryItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGroceryItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["grocery"] }),
  });
};
