"use client";
import { AnimatePresence, motion } from "motion/react";
import styles from "./Dialog.module.css";
import { useState } from "react";
import { button, div } from "motion/react-client";
import { addStore } from "@/app/actions/store";

export default function Dialog() {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* <button
        className={styles.actionButton}
        onClick={() => setShow((prev) => true)}
      >
        + <br />
        Add Store
      </button> */}
      {/* <AnimatePresence>
        {show ? (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }} // when it appears
            animate={{ opacity: 1 }} // while visible
            exit={{ opacity: 0 }} // when it leaves
            transition={{ duration: 0.2 }}
          > */}

      {/* </motion.div>
        ) : null}
      </AnimatePresence> */}
    </>
  );
}
