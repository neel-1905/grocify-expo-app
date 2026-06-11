import TabScreenBackground from "@/components/common/tabs-screen-background";
import { createGroceryOptions } from "@/features/grocery/data/createGroceryOptions";
import PlannerFormCard from "@/features/planner/ui/planner-form-card";
import PlannerHeroImage from "@/features/planner/ui/planner-hero-image";
import { FontAwesome6 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PlannerScreen() {
  const { data: groceryItems, isLoading } = useQuery(createGroceryOptions());
  const pendingCount =
    groceryItems?.filter((item) => !item.purchased).length ?? 0;
  const highPriorityCount =
    groceryItems?.filter((item) => item.priority === "high").length ?? 0;

  const totalQuantity =
    groceryItems
      ?.filter((item) => !item.purchased)
      .reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView
          contentContainerStyle={{
            padding: 20,
            gap: 20,
            paddingBottom: Platform.OS === "ios" ? 80 : 130,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TabScreenBackground />

          <View className="gap-4 rounded-3xl border border-border bg-card p-5">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-4 gap-4">
                <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
                  Grocery planner
                </Text>
                <Text className="text-3xl font-bold text-foreground">
                  Plan smarter, shop calmer.
                </Text>
                <Text className="text-sm text-muted-foreground">
                  Organize your next grocery run with categories, quantities,
                  and priority in one place.
                </Text>
              </View>

              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary">
                <FontAwesome6
                  name="wand-magic-sparkles"
                  size={18}
                  color="#ffffff"
                />
              </View>
            </View>

            <View className="flex-row gap-2">
              <View className="flex-1 flex flex-col justify-between rounded-2xl border border-border bg-background/80 p-3">
                <Text className="text-xs font-medium uppercase tracking-[1px] text-muted-foreground">
                  Pending
                </Text>
                <Text className="mt-1 text-xl font-bold text-foreground">
                  {pendingCount}
                </Text>
              </View>

              <View className="flex-1 flex flex-col rounded-2xl border border-border bg-background/80 p-3">
                <Text className="text-xs font-medium uppercase tracking-[1px] text-muted-foreground">
                  High Priority
                </Text>
                <Text className="mt-1 text-xl font-bold text-foreground">
                  {highPriorityCount}
                </Text>
              </View>

              <View className="flex-1 flex flex-col justify-between rounded-2xl border border-border bg-background/80 p-3">
                <Text className="text-xs font-medium uppercase tracking-[1px] text-muted-foreground">
                  Units
                </Text>
                <Text className="mt-1 text-xl font-bold text-foreground">
                  {totalQuantity}
                </Text>
              </View>
            </View>
          </View>

          <PlannerHeroImage />

          <View className="px-1">
            <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
              Build your list
            </Text>
            <Text className="mt-1 text-sm text-muted-foreground">
              Add items with the right quantity, category, and urgency.
            </Text>
          </View>

          <PlannerFormCard />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
