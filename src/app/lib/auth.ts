import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "./data";
import { createAuthMiddleware } from "better-auth/api";
import { groupMembers, groups, user } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
    after: createAuthMiddleware(async (ctx) => {
      if (!ctx.path.startsWith("/sign-up")) {
        return;
      }

      const newSession = ctx.context.newSession;
      const user = newSession?.user;
      if (!user) {
        return;
      }

      await db.transaction(async (tx) => {
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
      });
    }),
  },
});

export async function getCurrentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/login");
  }

  return session.user;
}
