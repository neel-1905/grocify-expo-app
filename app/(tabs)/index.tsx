import TabScreenBackground from "@/components/common/tabs-screen-background";
import { createGroceryOptions } from "@/features/grocery/data/createGroceryOptions";
import CompletedItems from "@/features/grocery/ui/completed-items";
import ListHeroCard from "@/features/grocery/ui/list-hero-card";
import PendingItemCard from "@/features/grocery/ui/pending-item-card";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function TabIndex() {
  const { toggleTheme } = useAppTheme();
  const { data: groceryItems, isLoading } = useQuery(createGroceryOptions());

  const completedItems = groceryItems?.filter((item) => item.purchased) || [];
  const pendingItems = groceryItems?.filter((item) => !item.purchased) || [];

  return (
    <FlatList
      data={pendingItems}
      renderItem={({ item }) => {
        return <PendingItemCard item={item} />;
      }}
      keyExtractor={(item) => item.id}
      className="flex-1 bg-background"
      contentContainerStyle={{ padding: 20, gap: 14, paddingBottom: 150 }}
      ListHeaderComponent={
        <View style={{ gap: 14, paddingTop: 30 }}>
          <TabScreenBackground />

          <ListHeroCard items={groceryItems || []} />

          <View className="flex-row items-center justify-between px-1">
            <Text className="font-semibold uppercase tracking-[1px] text-muted-foreground">
              Shopping items
            </Text>
            <Text className="text-sm text-muted-foreground">
              {pendingItems.length} active
            </Text>
          </View>
        </View>
      }
      ListFooterComponent={<CompletedItems items={completedItems} />}
      ListEmptyComponent={
        isLoading ? (
          <View className="justify-center items-center">
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <Text className="text-center text-muted-foreground mt-10">
            No items yet
          </Text>
        )
      }
    />
  );
}
