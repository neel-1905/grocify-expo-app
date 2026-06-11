import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { createGroceryItem } from "../data/grocery.apis";

export const useCreateGroceryItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGroceryItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["grocery"] }),
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });
};
