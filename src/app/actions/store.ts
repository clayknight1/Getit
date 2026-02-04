"use server";

import { stores } from "@/db/schema";
import db from "../lib/data";
import { getActiveGroupId } from "../lib/active-group";
import { getCurrentUser } from "../lib/auth";
import { eq } from "drizzle-orm";

export async function addStore(name: string) {
  const groupId = await getActiveGroupId();
  const user = await getCurrentUser();

  if (!groupId) {
    throw new Error("No active group");
  }

  if (user.email === "onetripdemo@test.com") {
    const storeCount = await db.query.stores.findMany({
      where: eq(stores.groupId, groupId),
    });

    if (storeCount.length >= 20) {
      throw new Error("Demo account limit: 20 stores max");
    }
  }

  try {
    const [store] = await db
      .insert(stores)
      .values({
        name: name,
        groupId,
      })
      .returning({ id: stores.id, name: stores.name });
    return store;
  } catch (err) {
    console.error(err);
  }
}
