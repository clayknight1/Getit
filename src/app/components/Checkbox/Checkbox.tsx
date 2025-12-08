"use client";

import styles from "./Checkbox.module.css";
import { ListItem } from "../../types/list-item";
import { ListItemUpdate } from "@/app/types/list-item-update";

type CheckboxProps = {
  item: ListItem;
  onToggle?: (id: number, checked: boolean) => void;
};

export default function Checkbox({ item, onToggle }: CheckboxProps) {
  function handleCheckClick(event: React.ChangeEvent<HTMLInputElement>): void {
    const purchased = event.target.checked;

    onToggle?.(item.id, purchased);
  }

  return (
    <label className={styles.check}>
      <input
        type="checkbox"
        checked={!!item.purchased}
        onChange={handleCheckClick}
        aria-label={item.name ?? undefined}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
}
