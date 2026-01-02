import React from "react";
import Spinner from "../Spinner/Spinner";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onButtonClick?: () => void;
};

export default function Button({
  children,
  disabled = false,
  loading = false,
  onButtonClick,
}: ButtonProps) {
  return (
    <>
      <button
        className={styles.btnPrimary}
        onClick={onButtonClick}
        type="submit"
        disabled={disabled}
      >
        {loading ? <Spinner /> : children}
      </button>
    </>
  );
}
