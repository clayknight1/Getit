import React from "react";
import styles from "./Card.module.css";

export default function Card({
  children,
  onClick,
  fullScreenOnMobile = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  fullScreenOnMobile?: boolean;
}) {
  const cardClasses = `
    ${onClick ? styles.buttonCard : styles.card}
    ${fullScreenOnMobile ? styles.fullScreenOnMobile : ""}
    `.trim();

  if (onClick) {
    return (
      <button className={cardClasses} onClick={onClick}>
        {children}
      </button>
    );
  }
  return (
    <div className={cardClasses}>
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}
