import {
    GroceryCategory,
    GroceryPriority,
} from "@/features/grocery/domain/grocery.types";
import { useCreateGroceryItem } from "@/features/grocery/hooks/useCreateGroceryItem .hook";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

const categories: GroceryCategory[] = [
  "Produce",
  "Dairy",
  "Meat",
  "Bakery",
  "Frozen",
  "Pantry",
  "Other",
  "Snacks",
];
const priorities: GroceryPriority[] = ["high", "medium", "low"];

const categoryIcons = {
  Produce: "leaf",
  Dairy: "cow",
  Meat: "meat",
  Bakery: "bread-slice",
  Frozen: "snowflake",
  Pantry: "box-open",
  Other: "box",
  Snacks: "cookie-bite",
};

const initialState = {
  name: "",
  quantity: 1,
  category: "",
  priority: "",
};

export default function PlannerFormCard() {
  const {
    mutate: createGroceryItem,
    isPending,
    error,
    isError,
  } = useCreateGroceryItem();

  const [formData, setFormData] = useState(initialState);

  const canCreate = formData.name.trim() !== "";

  const handleChange = (
    field: keyof typeof formData,
    value: string | number,
  ) => {
    if (field === "quantity" && typeof value === "number") {
      setFormData((prev) => ({ ...prev, [field]: Number(value) }));
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = () => {
    if (!canCreate) return;
    createGroceryItem(formData);
    setFormData(initialState);
    if (!isError) {
      Alert.alert("Success", "Item added to grocery list");
    }
  };

  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      {/* NAME */}
      <Text className="text-sm font-semibold text-foreground">Item name</Text>
      <View className="mt-2 flex-row items-center rounded-2xl border border-border bg-muted px-4 py-3">
        <FontAwesome6 name="bag-shopping" size={13} color="#5b7567" />
        <TextInput
          value={formData.name}
          onChangeText={(value) => handleChange("name", value)}
          placeholder="Ex: Blueberries"
          className="ml-3 flex-1 text-base text-foreground"
          placeholderTextColor="#8aa397"
        />
      </View>

      {/* QUANTITY */}
      <Text className="mt-4 text-sm font-semibold text-foreground">
        Quantity
      </Text>
      <View className="mt-2 flex-row items-center rounded-2xl border border-border bg-muted px-4 py-3">
        <FontAwesome6 name="hashtag" size={13} color="#5b7567" />
        <TextInput
          value={formData.quantity.toString()}
          onChangeText={(value) =>
            handleChange("quantity", parseInt(value) || 1)
          }
          keyboardType="number-pad"
          placeholder="1"
          placeholderTextColor="#8aa397"
          className="ml-3 flex-1 text-base text-foreground"
        />
      </View>

      {/* CATEGORIES */}
      <Text className="mt-4 text-sm font-semibold text-foreground">
        Category
      </Text>
      <View className="mt-2 flex-row flex-wrap gap-2">
        {categories.map((option) => {
          const active = option === formData.category;
          return (
            <Pressable
              key={option}
              onPress={() => handleChange("category", option)}
              className={`flex-row items-center rounded-full px-4 py-2 ${
                active ? "bg-primary" : "bg-secondary"
              }`}
            >
              <FontAwesome6
                name={categoryIcons[option]}
                size={12}
                color={active ? "#fff" : "#486856"}
              />
              <Text
                className={`ml-2 text-sm font-semibold ${
                  active
                    ? "text-primary-foreground"
                    : "text-secondary-foreground"
                }`}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* PRIORITY */}
      <Text className="mt-4 text-sm font-semibold text-foreground">
        Priority
      </Text>
      <View className="mt-2 flex-row gap-2">
        {priorities.map((option) => {
          const active = option === formData.priority;
          const icon =
            option === "high"
              ? "bolt"
              : option === "medium"
                ? "compass"
                : "seedling";
          return (
            <Pressable
              key={option}
              onPress={() => handleChange("priority", option)}
              className={`flex-1 flex-row items-center justify-center gap-2 rounded-2xl py-2 ${
                active ? "bg-primary" : "bg-secondary"
              }`}
            >
              <FontAwesome6
                name={icon}
                size={14}
                color={active ? "#ffffff" : "#486856"}
              />
              <Text
                className={`text-sm font-semibold capitalize ${
                  active
                    ? "text-primary-foreground"
                    : "text-secondary-foreground"
                }`}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        className={`mt-5 flex-row items-center justify-center rounded-2xl py-3 ${
          canCreate ? "bg-primary" : "bg-muted"
        } ${isPending ? "opacity-50" : ""}`}
        onPress={handleCreate}
        disabled={!canCreate || isPending}
      >
        {isPending ? (
          <ActivityIndicator
            size="small"
            color={canCreate ? "#ffffff" : "#7a9386"}
          />
        ) : (
          <>
            <FontAwesome6
              name="plus"
              size={14}
              color={canCreate ? "#ffffff" : "#7a9386"}
            />
            <Text
              className={`ml-2 text-base font-semibold ${
                canCreate ? "text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              Add to Grocery List
            </Text>
          </>
        )}
      </Pressable>

      {error ? (
        <View className="mt-3 rounded-2xl border border-destructive bg-destructive px-3 py-2">
          <Text className="text-sm text-white text-center uppercase">
            {error.message}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
