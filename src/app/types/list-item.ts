export type ListItem = {
  id: number;
  added_by?: number | null;
  createdAt?: string | null;
  name: string | null;
  needed?: boolean | null;
  notes?: string | null;
  purchased?: boolean | null;
  quantity?: number | null;
  position?: number | null;
};
