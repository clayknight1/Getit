import { groupMembers, listItems, stores } from "@/db/schema";
import db from "./data";
import { desc, eq } from "drizzle-orm";
import { ListItem } from "../types/list-item";
import { Store } from "../types/stores";

type StoreBase = {
  id: number;
  name: string;
  groupId: number | null;
};

type JoinedRow = {
  stores: StoreBase;
  list_items: ListItem | null;
};

async function getLists(userId: string): Promise<Store[]> {
  const rows = await db
    .select()
    .from(stores)
    .innerJoin(groupMembers, eq(stores.groupId, groupMembers.groupId))
    .leftJoin(listItems, eq(listItems.storeId, stores.id)) // 👈 key change
    .where(eq(groupMembers.userId, userId))
    .orderBy(stores.name, listItems.purchased, desc(listItems.id));

  return groupByStore(rows);
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

export default getLists;
