import React from "react";
import { Text, View } from "react-native";
import { GroceryItem } from "../domain/grocery.types";

export default function ListHeroCard({ items }: { items: GroceryItem[] }) {
  const completedCount = items.filter((item) => item.purchased).length;
  const pendingCount = items.length - completedCount;
  const completionRate = items.length
    ? Math.round((completedCount / items.length) * 100)
    : 0;

  return (
    <View className="bg-primary rounded-3xl p-5">
      <Text className="text-sm font-semibold uppercase tracking-[1px] text-primary-foreground/70">
        Today
      </Text>

      <Text className="mt-1 text-3xl font-extrabold text-primary-foreground">
        Your Grocery Board
      </Text>

      <Text className="mt-1 text-sm text-primary-foreground/80">
        {pendingCount} pending · {completedCount} completed
      </Text>

      <View className="mt-4 overflow-hidden rounded-full bg-white/50">
        <View
          className="h-2 rounded-full bg-secondary"
          style={{ width: `${completionRate}%` }}
        />
      </View>
    </View>
  );
}
