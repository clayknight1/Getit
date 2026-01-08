import { Drawer } from "vaul";
import styles from "./DrawerMenu.module.css"; // Assuming CSS Modules
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DrawerMenu({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function goToMembers() {
    router.push("/members");
    setOpen(false);
  }
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className={styles.overlay} />
        <Drawer.Content className={styles.content}>
          <Drawer.Title className={styles.title}>Menu Options</Drawer.Title>
          <Drawer.Description className={styles.visuallyHidden}>
            Navigation menu
          </Drawer.Description>

          <div className={styles.drawerMenu}>
            <button className={styles.drawerButton}>Log Out</button>
            <button className={styles.drawerButton}>Profile</button>
            <button onClick={goToMembers} className={styles.drawerButton}>
              Members
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
