export type ListItemUpdate = {
  name?: string;
  needed?: boolean;
  notes?: string | null;
  purchased?: boolean;
  purchasedAt?: string | null;
  purchasedBy?: number | null;
  quantity?: number | null;
};
