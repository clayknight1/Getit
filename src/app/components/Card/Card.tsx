"use client";

import { useState } from "react";
import ListItemRow from "../ListItemRow/ListItemRow";
import styles from "./Card.module.css";
import { ListItem } from "@/app/types/list-item";
import { Store } from "@/app/types/stores";
import AddItemForm from "../AddItemForm/AddItemForm";
import { addItem, updateItem } from "@/app/actions/list-items";
import { ListItemUpdate } from "@/app/types/list-item-update";

export default function Card({ initialData }: { initialData: Store }) {
  const [data, setData] = useState<Store>(initialData);

  function handleItemSelection(
    itemId: number,
    { purchased }: ListItemUpdate
  ): void {
    const updatedList: ListItem[] = data.listItems.map((item: ListItem) => {
      if (item.id === itemId) {
        return { ...item, purchased };
      }
      return item;
    });
    setData((prev) => ({
      ...prev,
      listItems: prev.listItems.map((item) =>
        item.id === itemId ? { ...item, purchased } : item
      ),
    }));
    const purchasedAt = purchased ? new Date().toISOString() : null;
    const update = {
      purchased,
      purchasedAt,
      purchasedBy: 1,
    };
    updateItem(itemId, 1, data.id, update);
  }

  async function handleAddItem(itemName: string): Promise<void> {
    const userId = 1;
    setData((prev) => ({
      ...prev,
      listItems: [{ name: itemName, id: -Date.now() }, ...prev.listItems],
    }));
    try {
      await addItem(itemName, userId, data.id);
    } catch (err) {
      console.error(err);
    }
  }

  function handleClearPurchased(): void {
    console.log("CLEARRR");
  }

  return (
    <div className={styles.card}>
      <div>
        <h2>{data?.name}</h2>
        <ul>
          {data?.listItems.map((item: ListItem) => {
            return (
              <li key={item.id}>
                <ListItemRow
                  item={item}
                  onToggle={handleItemSelection}
                ></ListItemRow>
              </li>
            );
          })}
        </ul>
      </div>
      <AddItemForm onAddItem={handleAddItem}></AddItemForm>
    </div>
  );
}
