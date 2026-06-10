import "dotenv/config";

import { randomUUID } from "crypto";

import { grocerySeedData } from "@/constants/seed-data";
import { db } from "@/lib/server/db/client";
import { groceryItems } from "@/lib/server/db/schema";

async function seed() {
  console.log("Seeding database...");

  await db.insert(groceryItems).values(
    grocerySeedData.map((item) => ({
      id: randomUUID(),
      ...item,
      updated_at: Date.now(),
    })),
  );

  console.log(
    `Seed complete: inserted ${grocerySeedData.length} grocery items`,
  );

  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
