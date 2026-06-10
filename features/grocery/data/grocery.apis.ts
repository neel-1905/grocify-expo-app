export const fetchGroceryItems = async () => {
  const response = await fetch("/api/items");
  const data = await response.json();

  if (!data.success) {
    throw new Error("Failed to fetch grocery items");
  }

  return data.items;
};

export const createGroceryItem = async (item: any) => {
  const response = await fetch("/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error("Failed to create grocery item");
  }

  return data.item;
};

export async function updateGroceryItem(
  id: string,
  body: { quantity?: number; purchased?: boolean },
) {
  const res = await fetch(`/api/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.item) throw new Error(data.error);
  return data.item;
}

export async function deleteGroceryItem(id: string) {
  const res = await fetch(`/api/items/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.error);
}
