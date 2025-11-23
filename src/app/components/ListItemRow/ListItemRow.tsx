import { ListItem } from "@/app/types/list-item";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./ListItemRow.module.css";

type CheckBoxProps = {
  item: ListItem;
  onToggle?: (id: string, checked: boolean) => void;
};

export default function ListItemRow({ item, onToggle }: CheckBoxProps) {
  function handleItemSelection(id: string, checked: boolean): void {
    onToggle?.(id, checked);
  }
  return (
    <div className={styles.wrapper}>
      <Checkbox item={item} onToggle={handleItemSelection}></Checkbox>
      {item.name}
    </div>
  );
}
