import { useClearItems } from "@/features/grocery/hooks/useClearItems.hook";
import { Pressable, Text } from "react-native";

export default function ClearCompletedButton() {
  const { mutate: clearPurchased, isPending } = useClearItems();

  return (
    <Pressable
      className="rounded-2xl bg-primary py-3"
      onPress={() => clearPurchased()}
      disabled={isPending}
    >
      <Text className="text-center text-base font-semibold text-primary-foreground">
        {isPending ? "Clearing..." : "Clear completed items"}
      </Text>
    </Pressable>
  );
}
