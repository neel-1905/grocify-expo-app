import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroceryItem } from "../data/grocery.apis";

export const useUpdateGroceryItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      ...body
    }: {
      id: string;
      quantity?: number;
      purchased?: boolean;
    }) => updateGroceryItem(id, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["grocery"] }),
  });
};
