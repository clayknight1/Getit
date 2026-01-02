import React from "react";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";
import MobileNav from "../components/MobileNav/MobileNav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/signIn");
  }
  return (
    <>
      <Navbar></Navbar>
      <main>{children}</main>
      <MobileNav></MobileNav>
    </>
  );
}
