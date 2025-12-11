import React from "react";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <Navbar></Navbar>
      <main>{children}</main>
    </>
  );
}
