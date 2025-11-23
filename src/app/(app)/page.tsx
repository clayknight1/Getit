import Card from "../components/Card/Card";
import getLists from "../lib/lists";
import { Store } from "../types/stores";
import styles from "./page.module.css";

export default async function Lists() {
  const stores = await getLists(1);

  return (
    <div className={styles.container}>
      {stores.map((store: Store) => (
        <div key={store.id}>
          <Card initialData={store} key={store.id}></Card>
        </div>
      ))}
    </div>
  );
}
