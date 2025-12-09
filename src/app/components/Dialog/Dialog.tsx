"use client";
import { AnimatePresence, motion } from "motion/react";
import styles from "./Dialog.module.css";
import { useState } from "react";
import { button, div } from "motion/react-client";
import { addStore } from "@/app/actions/store";

export default function Dialog() {
  const [show, setShow] = useState(false);
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
    <>
      <button
        className={styles.actionButton}
        onClick={() => setShow((prev) => true)}
      >
        + <br />
        Add Store
      </button>
      <AnimatePresence>
        {show ? (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }} // when it appears
            animate={{ opacity: 1 }} // while visible
            exit={{ opacity: 0 }} // when it leaves
            transition={{ duration: 0.2 }}
          >
            <motion.div className={styles.dialog}>
              <h1>Add a Store</h1>
              <form onSubmit={handleAddStore}>
                <input
                  className={styles.nameInput}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Add Store</button>
              </form>
              <button onClick={() => setShow((prev) => false)}>Close</button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
