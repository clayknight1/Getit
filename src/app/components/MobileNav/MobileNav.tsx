"use client";
import { useRouter } from "next/navigation";
import styles from "./MobileNav.module.css";
import DrawerMenu from "../DrawerMenu/DrawerMenu";

export default function MobileNav() {
  const router = useRouter();

  function handleHomeClick(): void {
    router.push("/");
  }

  function handleNewListClick(): void {
    router.push("/lists/new");
  }

  function handleInviteMemberClick(): void {
    router.push("/members/invite");
  }

  return (
    <div className={styles.bottomNavContainer}>
      <button className={styles.navButton} onClick={handleNewListClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={styles.navIcon}
        >
          <path d="M8 7h11" />
          <path d="M8 12h11" />
          <path d="M8 17h7" />
          <path d="M5.2 7h.01" />
          <path d="M5.2 12h.01" />
          <path d="M5.2 17h.01" />
          <path d="M18 16v6" />
          <path d="M15 19h6" />
        </svg>
      </button>

      <button className={styles.navButton} onClick={handleHomeClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={styles.navIcon}
        >
          <path d="M4 10.5L12 4l8 6.5" />
          <path d="M6.5 10.5V20a1.5 1.5 0 0 0 1.5 1.5h8A1.5 1.5 0 0 0 17.5 20v-9.5" />
          <path d="M10 21.5v-6.5a2 2 0 0 1 4 0v6.5" />
        </svg>
      </button>

      <DrawerMenu
        trigger={
          <button
            className={styles.navButton}
            // onClick={handleInviteMemberClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={styles.navIcon}
            >
              <path d="M10 12a4 4 0 1 0-4-4a4 4 0 0 0 4 4Z" />
              <path d="M3.5 20.5a6.5 6.5 0 0 1 13 0" />
            </svg>
          </button>
        }
      />
    </div>
  );
}
