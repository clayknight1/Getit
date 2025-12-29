"use client";

import { SignInForm } from "@/app/components/SignInForm/SignInForm";
import styles from "./page.module.css";
import { SignUpForm } from "@/app/components/SignUpForm/SignUpForm";
import { use, useEffect, useState } from "react";

export default function Login({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const rawInviteCode = use(searchParams).inviteCode;
  const inviteCode = Array.isArray(rawInviteCode)
    ? rawInviteCode[0] ?? null
    : rawInviteCode ?? null;
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (inviteCode) {
      setIsLogin(false);
    }
  }, []);
  return (
    <div className={styles.loginWrapper}>
      {isLogin ? (
        <SignInForm inviteCode={inviteCode}></SignInForm>
      ) : (
        <SignUpForm inviteCode={inviteCode}></SignUpForm>
      )}
      <span>Already have an account?</span>{" "}
      <button
        className={styles.linkButton}
        onClick={() => setIsLogin((prev) => !prev)}
      >
        {isLogin ? "Sign Up" : "Sign In"}
      </button>
    </div>
  );
}
