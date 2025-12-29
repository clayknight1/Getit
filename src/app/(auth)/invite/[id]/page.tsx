import InviteAccept from "@/app/components/InviteAccept/InviteAccept";
import { auth } from "@/app/lib/auth";
import db from "@/app/lib/data";
import { groupMembers, invites } from "@/db/schema";
import { and, eq, gt, isNull, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Invite({ params }: { params: { id: string } }) {
  const paramsData = await params;
  const code = paramsData.id;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/login?inviteCode=${encodeURIComponent(code)}`);
  }
  const userId = session.user.id;
  const emailNorm = session.user.email.trim().toLowerCase();

  const result = await db.transaction(async (tx) => {
    const consumed = await tx
      .update(invites)
      .set({ acceptedAt: sql`now()`, acceptedBy: userId })
      .where(
        and(
          eq(invites.code, code),
          eq(invites.emailNormalized, emailNorm),
          isNull(invites.acceptedAt),
          isNull(invites.revokedAt),
          gt(invites.expiresAt, sql`now()`)
        )
      )
      .returning({ id: invites.id, groupId: invites.groupId });

    if (consumed.length === 0) {
      return { ok: false as const, reason: "no_longer_valid" as const };
    }

    const { groupId } = consumed[0];

    await tx
      .insert(groupMembers)
      .values({ userId, groupId, role: "MEMBER" })
      .onConflictDoNothing();

    return { ok: true as const, groupId };
  });
  if (result.ok) {
    redirect("/");
  }
  return <InviteAccept></InviteAccept>;
}
