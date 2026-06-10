import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";

type Strategy = "oauth_google" | "oauth_github";

const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<Strategy | null>(null);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: Strategy) => {
    if (loadingStrategy) return;
    setLoadingStrategy(strategy);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (!createdSessionId || !setActive) {
        Alert.alert("Sign In Failed", `Failed to sign in with ${strategy}.`);
        return;
      }

      await setActive({ session: createdSessionId });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to sign in with social provider");
    } finally {
      setLoadingStrategy(null);
    }
  };

  return {
    loadingStrategy,
    handleSocialAuth,
  };
};

export default useSocialAuth;
