import { useAppTheme } from "@/hooks/useAppTheme";
import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

const SSOCallbackScreen = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const theme = useAppTheme();

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={theme.primaryForeground} />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  return <Redirect href={"/sign-in"} />;
};

export default SSOCallbackScreen;
