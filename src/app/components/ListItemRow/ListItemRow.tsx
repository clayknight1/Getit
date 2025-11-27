import { ListItem } from "@/app/types/list-item";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./ListItemRow.module.css";
import { ListItemUpdate } from "@/app/types/list-item-update";

type ListItemRowProps = {
  item: ListItem;
  onToggle?: (id: number, update: ListItemUpdate) => void;
};

export default function ListItemRow({ item, onToggle }: ListItemRowProps) {
  return (
    <div className={styles.wrapper}>
      <Checkbox item={item} onToggle={onToggle}></Checkbox>
      {item.name}
    </div>
  );
}
