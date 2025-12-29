"use server";

import { groupMembers, invites } from "@/db/schema";
import { getActiveGroupId } from "../lib/active-group";
import { getCurrentUser } from "../lib/auth";
import db from "../lib/data";
import { and, eq } from "drizzle-orm";

export type InviteToGroupResult = {
  url: string;
  code: string;
  expiresAt: string;
};

export async function inviteToGroup(
  email: string
): Promise<InviteToGroupResult> {
  const user = await getCurrentUser();
  const activeGroupId = await getActiveGroupId();
  const code = crypto.randomUUID();
  const expiresAt = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 7
  ).toISOString();
  const emailNormalized = email.trim().toLowerCase();
  if (!activeGroupId) throw new Error("No active group");

  const isMember = await db
    .select({ ok: groupMembers.groupId })
    .from(groupMembers)
    .where(
      and(
        eq(groupMembers.userId, user.id),
        eq(groupMembers.groupId, activeGroupId)
      )
    )
    .limit(1);

  if (!isMember.length) throw new Error("Not a member of this group");

  await db.insert(invites).values({
    groupId: activeGroupId,
    email,
    emailNormalized,
    code,
    createdBy: user.id,
    expiresAt,
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const url = `${baseUrl}/invite/${code}`;

  return { url, code, expiresAt };
}
