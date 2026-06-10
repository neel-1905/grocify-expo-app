import { createGroceryOptions } from "@/features/grocery/data/createGroceryOptions";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useAuth } from "@clerk/expo";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabIndex() {
  const { signOut } = useAuth();
  const { toggleTheme } = useAppTheme();

  const { data: groceryItems } = useQuery(createGroceryOptions());

  return (
    <SafeAreaView>
      <Text>TabIndex</Text>
      <Button title="Sign Out" onPress={() => signOut()} />

      <Button title="Toggle theme" onPress={toggleTheme} />
    </SafeAreaView>
  );
}
