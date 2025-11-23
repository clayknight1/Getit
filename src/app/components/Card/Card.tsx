"use client";

import { useEffect, useState } from "react";
import ListItemRow from "../ListItemRow/ListItemRow";
import styles from "./Card.module.css";
import { ListItem } from "@/app/types/list-item";
import { Store } from "@/app/types/stores";
import Button from "../Button/Button";

export default function Card({ initialData }: { initialData: any }) {
  const [data, setData] = useState<Store>(initialData);

  // useEffect(() => {
  //   // console.log("Prop received on client:", initialData);
  //   console.log("Type:", initialData);
  //   // console.log("JSON stringified:", JSON.stringify(initialData));
  // }, [initialData]);

  function handleItemSelection(id: string, checked: boolean): void {
    // const updatedListItems = data.listItems.map((item: ListItem) => {
    //   if (item.id === id) {
    //     item.purchased = checked;
    //   }
    //   return item;
    // });

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

    // setData((prev) => ({ ...prev, listItems: updatedListItems }));
  }

  function handleAddItem(): void {
    console.log("Button Clicked!");
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
      <input className={styles.itemInput} type="text" />
      <div className={styles.buttonWrapper}>
        <Button text="Add Item" onButtonClick={handleAddItem}></Button>
        {/* <Button
          text="Clear Purchased"
          onButtonClick={handleClearPurchased}
        ></Button> */}
      </div>
    </div>
  );
}
