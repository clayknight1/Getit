import { useState } from "react";
import styles from "./SignInForm.module.css";
import { authClient } from "@/app/lib/auth-client";
import Button from "../Button/Button";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const buttonDisabled = false;
  async function signIn(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const enteredEmail = email.trim();
    const enteredPassword = password.trim();
    if (!enteredEmail || !enteredPassword) {
      return;
    }
    const { data, error } = await authClient.signIn.email(
      {
        email: enteredEmail,
        password: enteredPassword,
        callbackURL: "/",
      },
      {
        onRequest: (ctx) => {
          console.log("LOADING...");
        },
        onSuccess: (ctx) => {
          console.log("SUCCESS: ", ctx);
        },
        onError: (ctx) => {
          console.error(ctx.error.message);
        },
      }
    );
  }
  return (
    <form onSubmit={signIn} className={styles.loginBox}>
      <h1>One Trip</h1>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button text="Sign In" disabled={buttonDisabled}></Button>
    </form>
  );
}
