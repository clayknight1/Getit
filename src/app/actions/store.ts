"use server";

import { stores } from "@/db/schema";
import db from "../lib/data";
import { getActiveGroupId } from "../lib/active-group";

export async function addStore(name: string) {
  const groupId = await getActiveGroupId();

  if (!groupId) {
    throw new Error("No active group");
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
