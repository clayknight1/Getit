"use server";

import { cookies } from "next/headers";

export async function setCurrentGroup(groupId: number): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("currentGroupId", String(groupId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function getCurrentGroupIdFromCookie(): Promise<number | null> {
  const cookieStore = await cookies();
  const currentGroupIdValue = cookieStore.get("currentgroupId")?.value;
  if (!currentGroupIdValue) {
    return null;
  }
  const currentGroupId = Number.parseInt(currentGroupIdValue, 10);
  return Number.isInteger(currentGroupId) && currentGroupId > 0
    ? currentGroupId
    : null;
}
