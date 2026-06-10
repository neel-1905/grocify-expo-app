export type GroceryCategory =
  | "Produce"
  | "Dairy"
  | "Meat"
  | "Frozen"
  | "Bakery"
  | "Pantry"
  | "Snacks"
  | "Other";

export type GroceryPriority = "low" | "medium" | "high";

export type GroceryItem = {
  id: string;
  name: string;
  category: GroceryCategory;
  priority: GroceryPriority;
  quantity: number;
  purchased: boolean;
};

export type CreateItemInput = {
  name: string;
  category: GroceryCategory;
  quantity: number;
  priority: GroceryPriority;
};

export type ItemsResponse = {
  items: GroceryItem[];
};

export type ItemResponse = {
  item: GroceryItem;
};
