"use server";

import { groupMembers, listItems, stores } from "@/db/schema";
import db from "../lib/data";
import { and, eq } from "drizzle-orm";
import { ListItemUpdate } from "../types/list-item-update";

export async function addItem(
  name: string,
  userId: number = 1,
  storeId: number
) {
  const hasAccess = await assertUserCanAddToStore(userId, storeId);
  if (!hasAccess) {
    throw new Error("You don't have access to this store");
  }
  await db.insert(listItems).values({
    name: name,
    addedBy: userId,
    storeId: storeId,
    needed: true,
  });
}

export async function updateItem(
  itemId: number,
  userId: number = 1,
  storeId: number,
  update: ListItemUpdate
): Promise<any> {
  const hasAccess = await assertUserCanAddToStore(userId, storeId);
  if (!hasAccess) {
    throw new Error("You don't have access to this store");
  }
  const now = new Date().toISOString();
  await db.update(listItems).set(update).where(eq(listItems.id, itemId));
}

export async function assertUserCanAddToStore(
  userId: number,
  storeId: number
): Promise<boolean> {
  const result = await db
    .select({ id: stores.id })
    .from(stores)
    .innerJoin(groupMembers, eq(stores.groupId, groupMembers.groupId))
    .where(and(eq(stores.id, storeId), eq(groupMembers.userId, userId)))
    .limit(1);

  return result.length > 0;
}
