import Card from "../components/Card/Card";
import Dialog from "../components/Dialog/Dialog";
import StoreListCard from "../components/StoreListCard/StoreListCard";
import { getCurrentUser } from "../lib/auth";
import { getLists, StoreSummary } from "../lib/lists";
import { Store } from "../types/stores";
import styles from "./page.module.css";

// Cache disabled because lists change frequently
export const dynamic = "force-dynamic";

export default async function Lists() {
  const user = await getCurrentUser();
  const stores: StoreSummary[] = await getLists(user.id);

  return (
    <div className={styles.container}>
      <Dialog></Dialog>
      {stores.map((store) => (
        <StoreListCard initialData={store} key={store.id}></StoreListCard>
      ))}
    </div>
  );
}
