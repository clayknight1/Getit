import { getSession } from "better-auth/api";
import { auth, getCurrentUserIdOrNull } from "./auth";
import { headers } from "next/headers";
import db from "./data";
import { user } from "@/db/auth-schema";
import { eq } from "drizzle-orm";

export async function getActiveGroupId(): Promise<number | null> {
  const userId = await getCurrentUserIdOrNull();

  if (!userId) {
    return null;
  }

  const row = await db
    .select({ activeGroupId: user.activeGroupId })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  const id = row[0]?.activeGroupId ?? null;
  return typeof id === "number" && id > 0 ? id : null;
}
