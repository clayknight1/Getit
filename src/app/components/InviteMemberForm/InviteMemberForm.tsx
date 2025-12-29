"use client";

import { useState } from "react";
import { Input } from "../Input/Input";
import Button from "../Button/Button";
import { inviteToGroup } from "@/app/actions/invite";
import toast from "react-hot-toast";

export default function InviteMemberForm() {
  const [email, setEmail] = useState("");
  const [inviteSignupUrl, setInviteSignupUrl] = useState<string | null>(null);
  const buttonDisabled = email.trim().length === 0;
  async function handleInviteMember(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const emailTrim = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      emailTrim
    );
    if (emailRegex) {
      try {
        const response = await inviteToGroup(email);
        toast("Invite created!");
        setInviteSignupUrl(response.url);
        setEmail("");
      } catch (err) {
        console.error("Invite failed:", err);
      }
    } else {
      console.log(alert("EMAIL INVALID!"));
    }
  }
  return (
    <form onSubmit={handleInviteMember}>
      <Input
        type="text"
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button text="Invite" disabled={buttonDisabled}></Button>
      {inviteSignupUrl && <h1>Here is the link to share: {inviteSignupUrl}</h1>}
    </form>
  );
}
