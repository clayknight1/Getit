import { Drawer } from "vaul";
import styles from "./DrawerMenu.module.css"; // Assuming CSS Modules

export default function DrawerMenu({ trigger }: { trigger: React.ReactNode }) {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className={styles.overlay} />
        <Drawer.Content className={styles.content}>
          <Drawer.Title className={styles.title}>Menu Options</Drawer.Title>
          <Drawer.Description className={styles.visuallyHidden}>
            Navigation menu
          </Drawer.Description>

          <div className={styles.innerContent}>
            <button>Log Out</button>
            <button>Profile</button>
            <button>Members</button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
