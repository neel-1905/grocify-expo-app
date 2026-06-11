import TabScreenBackground from "@/components/common/tabs-screen-background";
import ClearCompletedButton from "@/features/insights/ui/clear-completed-button";
import InsightsCategorySection from "@/features/insights/ui/insights-category-section";
import InsightsPrioritySection from "@/features/insights/ui/insights-priority-section";
import InsightsStatsSection from "@/features/insights/ui/insights-stats-section";
import UserProfile from "@/features/insights/ui/user-profile";
import React from "react";
import { ScrollView } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function InsightsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className=" bg-background py-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 20,
          paddingRight: 20,
          gap: 14,
          paddingBottom: insets.bottom + 50,
        }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <TabScreenBackground />
        <UserProfile />
        <InsightsStatsSection />
        <InsightsCategorySection />
        <InsightsPrioritySection />
        <ClearCompletedButton />
      </ScrollView>
    </SafeAreaView>
  );
}
