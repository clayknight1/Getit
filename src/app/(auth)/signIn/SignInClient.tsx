"use client";

import { SignInForm } from "@/app/components/SignInForm/SignInForm";
import styles from "./page.module.css";
import { SignUpForm } from "@/app/components/SignUpForm/SignUpForm";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
export default function SignInClient({
  inviteCode,
}: {
  inviteCode: string | null;
}) {
  const [isSignIn, setIsSignIn] = useState(() => !inviteCode);

  return (
    <div className={styles.signInWrapper}>
      {isSignIn ? (
        <SignInForm inviteCode={inviteCode} />
      ) : (
        <SignUpForm inviteCode={inviteCode} />
      )}
      <span>Already have an account?</span>
      <button
        className={styles.linkButton}
        onClick={() => setIsSignIn((prev) => !prev)}
      >
        {isSignIn ? "Sign Up" : "Sign In"}
      </button>
    </div>
  );
}
