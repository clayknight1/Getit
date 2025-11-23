import { ListItem } from "./list-item";

export type Store = {
  id: number;
  name: string;
  groupId: number;
  listItems: ListItem[];
};
