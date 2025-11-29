import { ListItem } from "@/app/types/list-item";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./ListItemRow.module.css";
import { ListItemUpdate } from "@/app/types/list-item-update";
import Button from "../Button/Button";

type ListItemRowProps = {
  item: ListItem;
  onToggle?: (id: number, update: ListItemUpdate) => void;
  onRemove?: (id: number) => void;
};

export default function ListItemRow({
  item,
  onToggle,
  onRemove,
}: ListItemRowProps) {
  return (
    <div className={styles.wrapper}>
      <Checkbox item={item} onToggle={onToggle}></Checkbox>
      {item.name}
      <button
        className={styles.removeButton}
        onClick={() => onRemove?.(item.id)}
      >
        X
      </button>
    </div>
  );
}
