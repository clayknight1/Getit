import Card from "../components/Card/Card";
import getLists from "../lib/lists";
import { Store } from "../types/stores";
import styles from "./page.module.css";

// Cache disabled because lists change frequentl
export const dynamic = "force-dynamic";

export default async function Lists() {
  const stores: Store[] = await getLists(1);

  return (
    <div className={styles.container}>
      {stores.map((store) => (
        <Card initialData={store} key={store.id}></Card>
      ))}
    </div>
  );
}
