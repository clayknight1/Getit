import { div } from "motion/react-client";
import styles from "./Navbar.module.css";
import Dialog from "../Dialog/Dialog";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export default function Navbar() {
  async function onLogout(): Promise<void> {
    "use server";
    console.log("onLogout");
    await auth.api.signOut({
      headers: await headers(),
    });
  }

  return (
    <div className={styles.navContainer}>
      <Dialog></Dialog>
      <form action={onLogout}>
        <button type="submit">Log Out</button>
      </form>
    </div>
  );
}
