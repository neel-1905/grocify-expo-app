// export type GroceryCategory =
//   | "Produce"
//   | "Dairy"
//   | "Meat"
//   | "Frozen"
//   | "Bakery"
//   | "Pantry"
//   | "Snacks"
//   | "Other";

// export type GroceryPriority = "low" | "medium" | "high";

// export type GroceryItem = {
//   id: string;
//   name: string;
//   category: GroceryCategory;
//   priority: GroceryPriority;
//   quantity: number;
//   purchased: boolean;
// };

// export type CreateItemInput = {
//   name: string;
//   category: GroceryCategory;
//   quantity: number;
//   priority: GroceryPriority;
// };

// type ItemsResponse = {
//   items: GroceryItem[];
// };

// type ItemResponse = {
//   item: GroceryItem;
// };

// type GroceryStore = {
//   items: GroceryItem[];
//   isLoading: boolean;
//   error: string | null;
//   loadItems: () => Promise<void>;
//   addItem: (input: CreateItemInput) => Promise<GroceryItem | void>;
//   updateQuantity: (id: string, quantity: number) => Promise<void>;
//   togglePurchased: (id: string) => Promise<void>;
//   removeItem: (id: string) => Promise<void>;
//   clearPurchased: () => Promise<void>;
// };

// export const useGroceryStore = create<GroceryStore>((set, get) => ({
//   items: [],
//   isLoading: true,
//   error: null,

// }));
