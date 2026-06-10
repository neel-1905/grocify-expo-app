import useSocialAuth from "@/features/auth/hooks/useSocialAuth";
import { useAppTheme } from "@/hooks/useAppTheme";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { loadingStrategy, handleSocialAuth } = useSocialAuth();
  const { toggleTheme } = useAppTheme();

  const isGoogleClicked = loadingStrategy === "oauth_google";
  const isGithubClicked = loadingStrategy === "oauth_github";

  const isLoading = isGoogleClicked || isGithubClicked;

  return (
    <SafeAreaView edges={["top"]}>
      <View className="px-6 pt-4">
        <Text className="text-center text-5xl font-extrabold tracking-tight text-foreground uppercase font-mono">
          Grocify
        </Text>
        <Text className="mt-2 text-center text-[14px] text-foreground">
          Plan smarter. Shop happier.
        </Text>
        <View className="mt-6 px-3">
          <Image
            source={require("../../assets/images/auth.png")}
            style={{
              width: "100%",
              height: 300,
            }}
            contentFit="contain"
          />
        </View>
      </View>

      {/* Auth section */}
      <View className="mt-8 rounded-4xl bg-card px-6 pb-8 pt-6 mx-6">
        <View className="items-center">
          <View className="rounded-full bg-secondary px-3 py-1">
            <Text className="text-xs font-semibold uppercase tracking-[1px] text-secondary-foreground">
              Welcome Back
            </Text>
          </View>
        </View>

        <Text className="mt-2 text-center text-sm leading-6 text-muted-foreground">
          Choose a social provider and jump right into your personalized grocery
          experience.
        </Text>

        <View className="mt-6">
          <Pressable
            className={`mb-3 h-16 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 ${
              isLoading ? "opacity-70" : ""
            }`}
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_google")}
          >
            <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
              <Image
                source={require("../../assets/images/google.png")}
                style={{ width: 20, height: 20 }}
              />
            </View>

            <Text className="ml-3 flex-1 text-lg font-semibold text-card-foreground">
              {isGoogleClicked
                ? "Connecting Google..."
                : "Continue with Google"}
            </Text>

            <FontAwesome name="angle-right" size={18} color="#5f6e66" />
          </Pressable>

          <Pressable
            className={`mb-3 h-16 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 ${
              isLoading ? "opacity-70" : ""
            }`}
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_github")}
          >
            <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
              <FontAwesome name="github" size={24} color="#111" />
            </View>
            <Text className="ml-3 flex-1 text-lg font-semibold text-card-foreground">
              {isGithubClicked
                ? "Connecting GitHub..."
                : "Continue with GitHub"}
            </Text>
            <FontAwesome name="angle-right" size={18} color="#5f6e66" />
          </Pressable>
        </View>
        {/* 
        <View className="mt-6">
          <Pressable onPress={toggleTheme}>
            <Text>Toggle theme!</Text>
          </Pressable>
        </View> */}

        <Text className="mt-3 text-center text-sm leading-5 text-muted-foreground">
          By continuing, you agree to our Terms and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
}
