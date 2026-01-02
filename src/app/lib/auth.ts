import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "./data";
import { createAuthMiddleware } from "better-auth/api";
import { groupMembers, groups, invites } from "@/db/schema";
import { user as userTable } from "@/db/auth-schema";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { and, eq, gt, isNull, sql } from "drizzle-orm";

export const auth = betterAuth({
  appName: "Get It",
  baseURL: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
  },
  telemetry: {
    enabled: false,
  },
  logger: {
    level: "debug",
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (!ctx.path.startsWith("/sign-up/email")) {
        return;
      }
      const inviteCode = ctx.headers?.get("X-INVITE-CODE") ?? null;
      if (inviteCode) {
        const { email } = ctx.body;
        const [invite] = await db
          .select()
          .from(invites)
          .where(eq(invites.code, inviteCode))
          .limit(1);

        if (!invite) {
          throw new Error("Invalid invite code!");
        }
        const signupEmailNormalized = String(email ?? "")
          .trim()
          .toLowerCase();

        if (!invite.emailNormalized) {
          throw new Error("Invite is not email-bound");
        }

        if (invite?.emailNormalized !== signupEmailNormalized) {
          throw new Error("Invite email does not match");
        }

        if (!!invite.acceptedAt) {
          throw new Error("Invite has already been used");
        }

        if (!!invite.revokedAt) {
          throw new Error("Invite has been revoked");
        }
        const emailValidation =
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        console.log("EMAIL VALIDATION", emailValidation);
        if (!emailValidation) {
          throw new Error("Invalid emailxxx");
        }
        const expiresAtDate = new Date(invite.expiresAt);
        const now = new Date();
        if (expiresAtDate < now) {
          throw new Error("Invitation has expired");
        }
        ctx.context.invite = invite;
      }
    }),
    after: createAuthMiddleware(async (ctx) => {
      if (!ctx.path.startsWith("/sign-up/email")) {
        return;
      }

      const newSession = ctx.context.newSession;
      const user = newSession?.user;
      if (!user) {
        return;
      }

      await db.transaction(async (tx) => {
        const invite = ctx.context.invite ?? null;
        if (invite) {
          await tx
            .insert(groupMembers)
            .values({
              userId: user.id,
              groupId: invite.groupId,
              role: "MEMBER",
            })
            .onConflictDoNothing();

          await tx
            .update(userTable)
            .set({ activeGroupId: invite.groupId })
            .where(eq(userTable.id, user.id));

          const consumed = await tx
            .update(invites)
            .set({
              acceptedAt: sql`now()`,
              acceptedBy: user.id,
            })
            .where(
              and(
                eq(invites.id, invite.id),
                isNull(invites.acceptedAt),
                isNull(invites.revokedAt),
                gt(invites.expiresAt, sql`now()`)
              )
            )
            .returning({ id: invites.id });

          if (consumed.length === 0) {
            throw new Error(
              "Invite could not be consumed (expired/used/revoked)."
            );
          }
        } else {
          const [group] = await tx
            .insert(groups)
            .values({
              name: user.name ? `${user.name}'s Group` : "My First Group",
            })
            .returning();

          await tx.insert(groupMembers).values({
            userId: user.id,
            groupId: group.id,
            role: "ADMIN",
          });

          await tx
            .update(userTable)
            .set({ activeGroupId: group.id })
            .where(eq(userTable.id, user.id));
        }
      });
    }),
  },
});

export async function getCurrentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/signIn");
  }

  return session.user;
}

export async function getCurrentUserIdOrNull(): Promise<string | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user?.id ?? null;
}
