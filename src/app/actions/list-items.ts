"use server";

import { groupMembers, listItems, stores } from "@/db/schema";
import db from "../lib/data";
import { and, eq } from "drizzle-orm";
import { getCurrentUser } from "../lib/auth";

export async function addItem(name: string, storeId: number) {
  const user = await getCurrentUser();
  const hasAccess = await assertUserHasStoreAccess(user.id, storeId);
  if (!hasAccess) {
    throw new Error("You don't have access to this store");
  }
  await db.insert(listItems).values({
    name: name,
    addedBy: user.id,
    storeId: storeId,
    needed: true,
  });
}

export async function updateItem(
  itemId: number,
  storeId: number,
  purchased: boolean
): Promise<any> {
  const user = await getCurrentUser();
  const hasAccess = await assertUserHasStoreAccess(user.id, storeId);
  const purchasedAt = purchased ? new Date().toISOString() : null;
  if (!hasAccess) {
    throw new Error("You don't have access to this store");
  }
  await db
    .update(listItems)
    .set({
      purchased,
      purchasedAt,
      purchasedBy: user.id,
    })
    .where(eq(listItems.id, itemId));
}

export async function deleteItem(
  itemId: number,
  storeId: number
): Promise<any> {
  const user = await getCurrentUser();
  const hasAccess = await assertUserHasStoreAccess(user.id, storeId);
  if (!hasAccess) {
    throw new Error("You don't have access to this store");
  }
  await db.delete(listItems).where(eq(listItems.id, itemId));
}

export async function assertUserHasStoreAccess(
  userId: string,
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
