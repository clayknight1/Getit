import Button from "../Button/Button";
import styles from "./AddItemForm.module.css";

type AddItemFormProps = {
  onAddItem: (itemName: string) => void;
};

export default function AddItemForm({ onAddItem }: AddItemFormProps) {
  function handleAddItem(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const value = formData.get("item") as string;
    onAddItem(value);
    form.reset();
  }
  return (
    <form onSubmit={handleAddItem}>
      <input name="item" className={styles.itemInput} type="text" />
      <div className={styles.buttonWrapper}>
        <Button text="Add Item"></Button>
        {/* <Button
          text="Clear Purchased"
          onButtonClick={handleClearPurchased}
        ></Button> */}
      </div>
    </form>
  );
}
