import { createGroceryItem, getGroceryItems } from "@/lib/server/db.actions";

export async function GET() {
  try {
    const items = await getGroceryItems();
    return Response.json({ items, success: true }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch items";
    return Response.json({ error: message, success: false }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, quantity, purchased, priority } = body;
    if (!name || !category || !purchased || !priority) {
      return Response.json(
        { error: "Missing required fields", success: false },
        { status: 400 },
      );
    }

    const item = await createGroceryItem({
      name,
      category,
      quantity,
      priority,
    });

    return Response.json({ success: true, item }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create item";
    return Response.json({ error: message, success: false }, { status: 500 });
  }
}
