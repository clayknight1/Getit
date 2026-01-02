import { useState } from "react";
import Button from "../Button/Button";
import styles from "./AddItemForm.module.css";

type AddItemFormProps = {
  onAddItem: (itemName: string) => void;
};

export default function AddItemForm({ onAddItem }: AddItemFormProps) {
  const [newItemName, setNewItemName] = useState("");

  function handleAddItem(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const value = newItemName.trim();
    if (!value) {
      return;
    }
    onAddItem(value);
    setNewItemName("");
  }

  const buttonDisabled = newItemName.trim().length === 0;
  return (
    <form onSubmit={handleAddItem}>
      <input
        name="item"
        className={styles.itemInput}
        type="text"
        value={newItemName}
        placeholder="Add an item…"
        onChange={(e) => setNewItemName(e.target.value)}
      />
      <div className={styles.buttonWrapper}>
        <Button disabled={buttonDisabled}>Add Item</Button>
        {/* <Button
          text="Clear Purchased"
          onButtonClick={handleClearPurchased}
        ></Button> */}
      </div>
    </form>
  );
}
