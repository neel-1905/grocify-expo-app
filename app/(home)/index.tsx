import { useAuth } from "@clerk/expo";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const { signOut } = useAuth();

  return (
    <View>
      <Text>HomeScreen</Text>

      <Pressable onPress={() => signOut()}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}
