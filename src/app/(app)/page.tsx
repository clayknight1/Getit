// import { useState } from "react";
import { headers } from "next/headers";
import Card from "../components/Card/Card";
import Dialog from "../components/Dialog/Dialog";
import { auth, getCurrentUser } from "../lib/auth";
import { authClient } from "../lib/auth-client";
import getLists from "../lib/lists";
import { Store } from "../types/stores";
import styles from "./page.module.css";

// Cache disabled because lists change frequently
export const dynamic = "force-dynamic";

export default async function Lists() {
  const user = await getCurrentUser();
  const stores: Store[] = await getLists(user.id);

  return (
    <div className={styles.container}>
      <Dialog></Dialog>
      {stores.map((store) => (
        <Card initialData={store} key={store.id}></Card>
      ))}
    </div>
  );
}
