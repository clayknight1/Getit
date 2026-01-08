import { user } from "@/db/auth-schema";
import db from "./data";
import { auth } from "./auth";
import { headers } from "next/headers";
import { getActiveGroupId } from "./active-group";
import { groupMembers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getMembers(): Promise<any> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const activeGroupId = await getActiveGroupId();
  if (!activeGroupId) throw new Error("No active group selected");

  const rows = await db
    .select()
    .from(groupMembers)
    .innerJoin(user, eq(groupMembers.userId, user.id))
    .where(eq(groupMembers.groupId, activeGroupId));

  return rows;
}
