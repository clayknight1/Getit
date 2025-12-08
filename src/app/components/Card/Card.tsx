"use client";

import { useState } from "react";
import ListItemRow from "../ListItemRow/ListItemRow";
import styles from "./Card.module.css";
import { ListItem } from "@/app/types/list-item";
import { Store } from "@/app/types/stores";
import AddItemForm from "../AddItemForm/AddItemForm";
import { addItem, deleteItem, updateItem } from "@/app/actions/list-items";
import { ListItemUpdate } from "@/app/types/list-item-update";
import { motion, AnimatePresence } from "motion/react";
import Dialog from "../Dialog/Dialog";
import { div } from "motion/react-client";

export default function Card({ initialData }: { initialData: Store }) {
  const [data, setData] = useState<Store>(initialData);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  function handleItemSelection(itemId: number, purchased: boolean): void {
    setData((prev) => {
      const updatedListItems = prev.listItems.map((item) =>
        item.id === itemId ? { ...item, purchased } : item
      );

      const unpurchased = updatedListItems
        .filter((item) => !item.purchased)
        .sort((a, b) => a.id - b.id);
      const purchasedItems = updatedListItems
        .filter((item) => item.purchased)
        .sort((a, b) => a.id - b.id);
      const newOrder = [...unpurchased, ...purchasedItems];

      return {
        ...prev,
        listItems: newOrder,
      };
    });

    updateItem(itemId, data.id, purchased);
  }

  async function handleAddItem(itemName: string): Promise<void> {
    setData((prev) => {
      const updatedListItems = [
        { name: itemName, id: -Date.now() },
        ...prev.listItems,
      ];
      const unpurchased = updatedListItems
        .filter((item) => !item.purchased)
        .sort((a, b) => a.id - b.id);
      const purchasedItems = updatedListItems.filter((item) => item.purchased);

      const newOrder = [...unpurchased, ...purchasedItems];

      return {
        ...prev,
        listItems: newOrder,
      };
    });

    try {
      await addItem(itemName, data.id);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleRemoveItem(id: number) {
    setData((prev) => {
      const updatedList = prev.listItems.filter((item) => item.id !== id);

      return { ...prev, listItems: updatedList };
    });
    await deleteItem(id, data.id);
  }

  function handleClearPurchased(): void {
    console.log("CLEARRR");
  }

  function setShowDialogState() {
    setShowDialog((prev) => !prev);
  }

  return (
    <div>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <h2>{data?.name}</h2>
          <ul className={styles.list}>
            <AnimatePresence>
              {data?.listItems.map((item: ListItem) => {
                return (
                  <motion.li key={item.id} exit={{ opacity: 1 }} layout>
                    <ListItemRow
                      item={item}
                      onToggle={handleItemSelection}
                      onRemove={handleRemoveItem}
                    ></ListItemRow>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>
        <AddItemForm onAddItem={handleAddItem}></AddItemForm>
      </div>
    </div>
  );
}
