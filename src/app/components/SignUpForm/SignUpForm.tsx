import { useState } from "react";
import styles from "./SignUpForm.module.css";
import { authClient } from "@/app/lib/auth-client";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";

export function SignUpForm({ inviteCode }: { inviteCode: string | null }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const buttonDisabled = isLoading || !name || !email || !password;
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
    await authClient.signUp.email({
      email: enteredEmail,
      password: enteredPassword,
      name: enteredName,
      fetchOptions: {
        headers: {
          "X-INVITE-CODE": inviteCode ?? "",
        },
        onRequest: () => {
          setError("");
          setIsLoading(true);
        },
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          setIsLoading(false);
          setError(ctx.error.message);
        },
      },
    });
  }
  return (
    <form onSubmit={signUp} className={styles.signupBox}>
      <h1>One Trip</h1>
      <h2>SIgn Up</h2>
      <input
        type="text"
        placeholder="Enter Name..."
        value={name}
        disabled={isLoading}
        autoComplete="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Email..."
        value={email}
        disabled={isLoading}
        autoComplete="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password..."
        value={password}
        disabled={isLoading}
        autoComplete="new-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button disabled={buttonDisabled} loading={isLoading}>
        Sign Up
      </Button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
