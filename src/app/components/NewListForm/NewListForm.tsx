"use client";

import { useState } from "react";
import styles from "./NewListForm.module.css";
import { addStore } from "@/app/actions/store";
import { Input } from "../Input/Input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewListForm() {
  const [name, setName] = useState("");
  const router = useRouter();

  async function handleAddStore(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const enteredName = name.trim();
    if (!enteredName) {
      return;
    }

    const store = await addStore(enteredName);

    if (!store?.id) {
      return;
    }
    toast(`${store?.name} was added!`);
    router.push(`/lists/${store.id}`);
  }
  return (
    <form onSubmit={handleAddStore}>
      <Input
        label="Name"
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Store</button>
    </form>
  );
}
