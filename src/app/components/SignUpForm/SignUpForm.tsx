import { useState } from "react";
import styles from "./SignUpForm.module.css";
import { authClient } from "@/app/lib/auth-client";
import Button from "../Button/Button";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const buttonDisabled = false;
  async function signUp(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const enteredName = name.trim();
    const enteredEmail = email.trim();
    const enteredPassword = password.trim();
    if (!enteredName || !enteredEmail || !enteredPassword) {
      return;
    }
    const { data, error } = await authClient.signUp.email(
      {
        email: enteredEmail,
        password: enteredPassword,
        name: enteredName,
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
    <form onSubmit={signUp} className={styles.loginBox}>
      <h1>One Trip</h1>
      <h2>SIgn Up</h2>
      <input
        type="text"
        placeholder="Enter Name..."
        onChange={(e) => setName(e.target.value)}
      />
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
      <Button text="Sign Up" disabled={buttonDisabled}></Button>
    </form>
  );
}
