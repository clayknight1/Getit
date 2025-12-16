"use client";

import { StoreSummary } from "@/app/lib/lists";
import styles from "./StoreListCard.module.css";
import { useRouter } from "next/navigation";

export default function StoreListCard({
  initialData,
}: {
  initialData: StoreSummary;
}) {
  const { name, itemCount, id } = initialData;
  const router = useRouter();

  function handleOpenStore() {
    router.push(`/lists/${id}`);
  }
  return (
    <>
      <button className={styles.card} onClick={handleOpenStore}>
        <h2>{name}</h2>
        <div>{itemCount}</div>
      </button>
    </>
  );
}
