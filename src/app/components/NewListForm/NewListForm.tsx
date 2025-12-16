"use client";

import { useState } from "react";
import styles from "./NewListForm.module.css";
import { addStore } from "@/app/actions/store";

export default function NewListForm() {
  const [name, setName] = useState("");

  async function handleAddStore(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const enteredName = name.trim();
    console.log("ADD STORE!", enteredName);
    addStore(enteredName);
  }
  return (
    <form onSubmit={handleAddStore}>
      <input
        className={styles.nameInput}
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Store</button>
    </form>
  );
}
