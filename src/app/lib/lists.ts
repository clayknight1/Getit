import { groupMembers, listItems, stores } from "@/db/schema";
import db from "./data";
import { eq } from "drizzle-orm";
import { ListItem } from "../types/list-item";

async function getLists(userId: number) {
  const newListItems = await db
    .select()
    .from(listItems)
    .innerJoin(stores, eq(listItems.storeId, stores.id))
    .innerJoin(groupMembers, eq(stores.groupId, groupMembers.groupId))
    .where(eq(groupMembers.userId, userId));

  return groupByStore(newListItems);
}

function groupByStore(rows: any): any[] {
  console.log("ROWS", rows);
  const stores = new Map();
  for (const row of rows) {
    const store = row.stores;
    const item = row.list_items;

    if (!stores.has(store?.id)) {
      stores.set(store?.id, { ...store, listItems: [] });
    }

    stores.get(store.id).listItems.push(item);
  }
  console.log("Array.from(stores.values());", Array.from(stores.values()));
  const sorted = Array.from(stores.values()).map((store) => {
    const purchased: ListItem[] = [];
    const unpurchased: ListItem[] = [];

    store.listItems.forEach((item: ListItem) => {
      if (item.purchased) {
        purchased.push(item);
      } else {
        unpurchased.push(item);
      }
    });
    store.listItems = [...unpurchased, ...purchased];

    return store;
  });

  return sorted;
}

export default getLists;
