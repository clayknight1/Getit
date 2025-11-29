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
  list_items: ListItem;
};

async function getLists(userId: number): Promise<Store[]> {
  const newListItems = await db
    .select()
    .from(listItems)
    .innerJoin(stores, eq(listItems.storeId, stores.id))
    .innerJoin(groupMembers, eq(stores.groupId, groupMembers.groupId))
    .where(eq(groupMembers.userId, userId))
    .orderBy(stores.name, listItems.purchased, desc(listItems.id));

  return groupByStore(newListItems);
}

function groupByStore(rows: JoinedRow[]): Store[] {
  const stores = new Map();
  for (const row of rows) {
    const store = row.stores;
    const item = row.list_items;

    if (!stores.has(store?.id)) {
      stores.set(store?.id, { ...store, listItems: [] });
    }

    stores.get(store.id).listItems.push(item);
  }
  return Array.from(stores.values());
}

export default getLists;
