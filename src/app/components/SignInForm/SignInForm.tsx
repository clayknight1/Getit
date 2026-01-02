import { useState } from "react";
import styles from "./SignInForm.module.css";
import { authClient } from "@/app/lib/auth-client";
import Button from "../Button/Button";

export function SignInForm({ inviteCode }: { inviteCode: string | null }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const buttonDisabled = isLoading || !email || !password;

  async function signIn(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const enteredEmail = email.trim();
    const enteredPassword = password.trim();
    if (!enteredEmail || !enteredPassword) {
      return;
    }
    await authClient.signIn.email(
      {
        email: enteredEmail,
        password: enteredPassword,
        callbackURL: inviteCode
          ? `/invite/${encodeURIComponent(inviteCode)}`
          : "/",
      },
      {
        onRequest: () => {
          setError("");
          setIsLoading(true);
        },
        onError: (ctx) => {
          setIsLoading(false);
          setError(ctx.error.message);
        },
      }
    );
  }
  return (
    <form onSubmit={signIn} className={styles.signInBox}>
      <h1>One Trip</h1>
      <h2>Sign In</h2>
      <input
        type="text"
        value={email}
        disabled={isLoading}
        autoComplete="email"
        placeholder="Enter Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        disabled={isLoading}
        placeholder="Enter Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button disabled={buttonDisabled} loading={isLoading}>
        Sign In
      </Button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
