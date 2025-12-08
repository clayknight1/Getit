export type ListItemUpdate = {
  name?: string;
  needed?: boolean;
  notes?: string | null;
  purchased?: boolean;
  purchasedAt?: string | null;
  purchasedBy?: string| null;
  quantity?: number | null;
};
