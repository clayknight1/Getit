"use client";
import { DropdownMenu } from "radix-ui";
import styles from "./UserDropdown.module.css";

type UserDopwdownProps = {
  onLogout: () => void;
};

export default function UserDropdown({ onLogout }: UserDopwdownProps) {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button className={styles.userIcon}>CA</button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.dropdownContent} sideOffset={5}>
          <DropdownMenu.Item className={styles.dropdownItem}>
            <button onClick={onLogout}>Log Out</button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
