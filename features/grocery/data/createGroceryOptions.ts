import { queryOptions } from "@tanstack/react-query";
import { fetchGroceryItems } from "./grocery.apis";

export const createGroceryOptions = () =>
  queryOptions({
    queryKey: ["grocery"],
    queryFn: fetchGroceryItems,
  });
