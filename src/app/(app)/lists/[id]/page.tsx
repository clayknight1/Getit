import Card from "@/app/components/Card/Card";
import { fetchList } from "@/app/lib/lists";

export default async function List({ params }: { params: { id: string } }) {
  const { id } = await params;
  const storeId = Number(id);
  const list = await fetchList(storeId);

  return (
    <>
      <Card initialData={list}></Card>
    </>
  );
}
