"use client";

import { SignInForm } from "@/app/components/SignInForm/SignInForm";
import styles from "./page.module.css";
import { SignUpForm } from "@/app/components/SignUpForm/SignUpForm";
import { useState } from "react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className={styles.loginWrapper}>
      {isLogin ? <SignInForm></SignInForm> : <SignUpForm></SignUpForm>}
      <button onClick={() => setIsLogin((prev) => !prev)}>
        {isLogin ? "Sign Up" : "Sign In"}
      </button>
    </div>
  );
}
