import { useAppTheme } from "@/hooks/useAppTheme";
import { useAuth } from "@clerk/expo";
import { FontAwesome } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Redirect, Tabs } from "expo-router";
import React, { ComponentProps } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AppTheme = ReturnType<typeof useAppTheme>;

export const TabBarIcon = ({
  name,
  color,
}: {
  name: ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) => <FontAwesome size={22} name={name} color={color} />;

const TABS: {
  name: string;
  label: string;
  icon: ComponentProps<typeof FontAwesome>["name"];
}[] = [
  { name: "index", label: "Home", icon: "home" },
  { name: "insights", label: "Insights", icon: "bar-chart" },
  { name: "planner", label: "Planner", icon: "calendar" },
];

function FloatingTabBar({
  state,
  descriptors,
  navigation,
  theme,
}: BottomTabBarProps & { theme: AppTheme }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { bottom: insets.bottom + 16 }]}>
      <View style={[styles.bar, { backgroundColor: theme.card }]}>
        {state.routes.map((route, index) => {
          const tab = TABS[index];
          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.7}
              style={styles.tab}
            >
              <TabBarIcon
                name={tab.icon}
                color={focused ? theme.primary : theme.cardForeground}
              />
              <Text
                style={[
                  styles.label,
                  { color: focused ? theme.primary : theme.cardForeground },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const theme = useAppTheme();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: theme.background,
        },
      }}
      tabBar={(props) => <FloatingTabBar {...props} theme={theme} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="insights" />
      <Tabs.Screen name="planner" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 20,
    right: 20,
    pointerEvents: "box-none",
  },
  bar: {
    flexDirection: "row",
    borderRadius: 36,
    height: 70,
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: "500",
  },
});
