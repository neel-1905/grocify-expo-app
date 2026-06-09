import { ThemeName, themes } from "@/constants/themes";
import { VariableContextProvider } from "nativewind";
import { useColorScheme } from "react-native";

export function ThemeProvider({
  name = "default",
  children,
}: {
  name: ThemeName;
  children: React.ReactNode;
}) {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <VariableContextProvider value={themes[name][colorScheme]}>
      {children}
    </VariableContextProvider>
  );
}
