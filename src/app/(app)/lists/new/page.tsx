import NewListForm from "@/app/components/NewListForm/NewListForm";
import styles from "./page.module.css";

export default function NewListPage() {
  return (
    <div className={styles.dialog}>
      <h1>Add a List</h1>
      <NewListForm></NewListForm>
    </div>
  );
}
