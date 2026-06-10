import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { GroceryItem } from "../domain/grocery.types";
import { useDeleteGroceryItem } from "../hooks/useDeleteGroceryItem .hook";
import { useUpdateGroceryItem } from "../hooks/useUpdateGroceryItem .hook";

export default function CompletedItems({ items }: { items: GroceryItem[] }) {
  const { mutate: deleteItem, isPending: isDeleting } = useDeleteGroceryItem();
  const { mutate: updateItem, isPending: isUpdating } = useUpdateGroceryItem();

  const completedItems = items.filter((item) => item.purchased);

  if (!completedItems.length) return null;

  return (
    <View className="mt-3 rounded-3xl border border-border bg-secondary p-4">
      <Text className="text-sm font-semibold uppercase tracking-[1px] text-secondary-foreground">
        Completed
      </Text>

      {completedItems.map((item) => (
        <View
          key={item.id}
          className={`mt-3 flex-row items-center justify-between rounded-2xl border border-border bg-card px-3 py-2 ${isUpdating || isDeleting ? "opacity-50" : ""}`}
        >
          <View className="flex-row items-center gap-2">
            <Pressable
              disabled={isUpdating || isDeleting}
              onPress={() => updateItem({ id: item.id, purchased: false })}
              className="h-6 w-6 items-center justify-center rounded-full bg-primary"
            >
              <FontAwesome6 name="check" size={12} color="#ffffff" />
            </Pressable>
            <Text className="text-base text-muted-foreground line-through">
              {item.name}
            </Text>
          </View>

          <Pressable
            disabled={isUpdating || isDeleting}
            onPress={() => deleteItem(item.id)}
            className="h-8 w-8 items-center justify-center rounded-xl bg-destructive"
          >
            <FontAwesome6 name="trash" size={12} color="#d45f58" />
          </Pressable>
        </View>
      ))}
    </View>
  );
}
