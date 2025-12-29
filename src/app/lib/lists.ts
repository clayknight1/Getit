import { groupMembers, listItems, stores } from "@/db/schema";
import db from "./data";
import { and, count, desc, eq } from "drizzle-orm";
import { ListItem } from "../types/list-item";
import { Store } from "../types/stores";
import { getCurrentUser } from "./auth";
import { notFound } from "next/navigation";
import { getActiveGroupId } from "./active-group";

export type StoreSummary = {
  id: number;
  name: string;
  itemCount: number;
};

type StoreBase = {
  id: number;
  name: string;
  groupId: number | null;
};

type JoinedRow = {
  stores: StoreBase;
  list_items: ListItem | null;
};

export async function getLists(userId: string): Promise<StoreSummary[]> {
  const groupId = await getActiveGroupId();
  if (!groupId) throw new Error("No active group");

  const rows = await db
    .select({
      id: stores.id,
      name: stores.name,
      itemCount: count(listItems.id).as("itemCount"),
    })
    .from(stores)
    .innerJoin(groupMembers, eq(stores.groupId, groupMembers.groupId))
    .leftJoin(listItems, eq(listItems.storeId, stores.id))
    .where(and(eq(groupMembers.userId, userId), eq(stores.groupId, groupId)))
    .groupBy(stores.id, stores.name)
    .orderBy(stores.name);

  return rows;
}

function groupByStore(rows: JoinedRow[]): Store[] {
  const stores = new Map();
  for (const row of rows) {
    const store = row.stores;
    const item = row.list_items;

    if (!stores.has(store?.id)) {
      stores.set(store?.id, { ...store, listItems: [] });
    }

    if (item) {
      stores.get(store.id).listItems.push(item);
    }
  }
  return Array.from(stores.values());
}

export async function fetchList(storeId: number): Promise<any> {
  const groupId = await getActiveGroupId();
  if (!groupId) throw new Error("No active group");

  if (Number.isNaN(storeId)) {
    notFound();
  }
  const user = await getCurrentUser();
  const rows = await db
    .select()
    .from(stores)
    .innerJoin(groupMembers, eq(stores.groupId, groupMembers.groupId))
    .leftJoin(listItems, eq(listItems.storeId, stores.id))
    .where(
      and(
        eq(groupMembers.userId, user.id),
        eq(stores.id, storeId),
        eq(stores.groupId, groupId)
      )
    );

  const store = rows[0].stores;
  const items = rows[0].list_items
    ? rows.map((item) => {
        const listItem = item.list_items;
        return {
          id: listItem?.id,
          name: listItem?.name,
          purchased: listItem?.purchased,
        };
      })
    : [];
  return {
    ...store,
    listItems: items,
  };
}
