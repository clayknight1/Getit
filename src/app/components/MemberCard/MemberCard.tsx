import Card from "../Card/Card";
import styles from "./MemberCard.module.css";

export default function MemberCard({
  name,
  email,
  createdAt,
}: {
  name: string;
  email: string;
  createdAt: string;
}) {
  return (
    <Card>
      <div className={styles.memberRow}>
        {/* Default avatar */}
        <div className={styles.memberAvatar} aria-hidden="true">
          <span className={styles.memberAvatarText}>JD</span>
        </div>

        {/* Main info */}
        <div className={styles.memberMain}>
          <div className={styles.memberTop}>
            <div className={styles.memberName}>{name}</div>
            <div className={styles.memberMeta}>Joined Jan 3, 2026</div>
          </div>

          <div className={styles.memberEmail}>{email}</div>
        </div>

        {/* Actions placeholder */}
        <div className={styles.memberActions}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Member actions"
          >
            ⋯
          </button>

          {/*
      OR, swap in later:
      <button type="button" className={styles.dangerBtn}>
        Remove
      </button>
    */}
        </div>
      </div>
    </Card>
  );
}
