"use server";

import { stores } from "@/db/schema";
import db from "../lib/data";

export async function addStore(name: string) {
  try {
    const result = await db
      .insert(stores)
      .values({
        name: name,
        groupId: 1,
      })
      .returning();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}
