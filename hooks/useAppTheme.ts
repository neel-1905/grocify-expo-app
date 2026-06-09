import { ThemeName, themes } from "@/constants/themes";
import { useColorScheme } from "react-native";

export function useAppTheme(themeName: ThemeName = "default") {
  const colorScheme = useColorScheme() ?? "light";

  const theme = themes[themeName][colorScheme];

  return {
    background: theme["--color-background"],
    foreground: theme["--color-foreground"],

    card: theme["--color-card"],
    cardForeground: theme["--color-card-foreground"],

    primary: theme["--color-primary"],
    primaryForeground: theme["--color-primary-foreground"],

    secondary: theme["--color-secondary"],
    secondaryForeground: theme["--color-secondary-foreground"],

    muted: theme["--color-muted"],
    mutedForeground: theme["--color-muted-foreground"],

    accent: theme["--color-accent"],

    destructive: theme["--color-destructive"],
    destructiveForeground: theme["--color-destructive-foreground"],

    border: theme["--color-border"],
    input: theme["--color-input"],
    ring: theme["--color-ring"],

    success: theme["--color-success"],

    priorityLow: theme["--color-priority-low"],
    priorityLowForeground: theme["--color-priority-low-foreground"],

    priorityMedium: theme["--color-priority-medium"],
    priorityMediumForeground: theme["--color-priority-medium-foreground"],

    priorityHigh: theme["--color-priority-high"],
    priorityHighForeground: theme["--color-priority-high-foreground"],
  };
}
