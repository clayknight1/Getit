"use client";

import styles from "./Checkbox.module.css";
import { ListItem } from "../../types/list-item";

type CheckBoxProps = {
  item: ListItem;
  onToggle?: (id: string, checked: boolean) => void;
};

export default function Checkbox({ item, onToggle }: CheckBoxProps) {
  function handleCheckClick(event: any): void {
    const checked = event.target.checked;

    onToggle?.(item.id, checked);
  }

  return (
    <label className={styles.check}>
      <input
        type="checkbox"
        checked={item.purchased}
        onChange={handleCheckClick}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
}
