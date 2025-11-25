"use client";

import { useState } from "react";
import ListItemRow from "../ListItemRow/ListItemRow";
import styles from "./Card.module.css";
import { ListItem } from "@/app/types/list-item";
import { Store } from "@/app/types/stores";
import AddItemForm from "../AddItemForm/AddItemForm";
import { addItem } from "@/app/actions/list-items";

export default function Card({ initialData }: { initialData: any }) {
  const [data, setData] = useState<Store>(initialData);

  function handleItemSelection(id: string, checked: boolean): void {
    const purchased: ListItem[] = [];
    const unpurchased: ListItem[] = [];

    data.listItems.forEach((item: ListItem) => {
      if (item.id === id) {
        item.purchased = checked;
      }
      if (item.purchased) {
        purchased.push(item);
      } else {
        unpurchased.push(item);
      }
    });
    setData((prev) => ({ ...prev, listItems: [...unpurchased, ...purchased] }));
  }

  async function handleAddItem(itemName: string): Promise<void> {
    const userId = 1;
    setData((prev) => ({
      ...prev,
      listItems: [
        { name: itemName, id: `temp-${crypto.randomUUID()}` },
        ...data.listItems,
      ],
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
    <div className={styles.card} key={data?.id}>
      <h2>{data?.name}</h2>
      <ul>
        {data?.listItems.map((item: any) => {
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
      <AddItemForm onAddItem={handleAddItem}></AddItemForm>
    </div>
  );
}
