"use client";

import styles from "./Navbar.module.css";
import { DropdownMenu } from "radix-ui";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  async function onLogout(): Promise<void> {
    try {
      await authClient.signOut();
      router.push("/signIn");
    } catch (err) {
      console.error("Error signing out", err);
    }
  }

  function handleInviteMemberClick(): void {
    router.push("/members/invite");
  }

  return (
    <div className={styles.navContainer}>
      <div>
        <svg
          viewBox="0 0 100 100"
          width="30"
          height="30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="10" y="10" width="80" height="80" rx="16" fill="#10b981" />

          <path
            d="M 32 42 L 32 75 C 32 78 34 80 37 80 L 63 80 C 66 80 68 78 68 75 L 68 42 Z"
            fill="white"
          />

          <path
            d="M 40 42 Q 40 30 50 30 Q 60 30 60 42"
            stroke="white"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          <path
            d="M 42 58 L 48 64 L 58 50"
            stroke="#10b981"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={styles.navRight}>
        <button onClick={handleInviteMemberClick}>Invite</button>
        <DropdownMenu.Root modal={false}>
          <DropdownMenu.Trigger asChild>
            <button className={styles.userIcon}>CA</button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className={styles.dropdownContent}
              sideOffset={5}
            >
              <DropdownMenu.Item className={styles.dropdownItem}>
                <button onClick={onLogout}>Log Out</button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
}
