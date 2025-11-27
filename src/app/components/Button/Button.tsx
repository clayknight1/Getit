import styles from "./Button.module.css";

type ButtonProps = {
  text: string;
  disabled?: boolean;
  onButtonClick?: () => void;
};

export default function Button({
  text,
  disabled = false,
  onButtonClick,
}: ButtonProps) {
  return (
    <button
      className={styles.btnPrimary}
      onClick={onButtonClick}
      type="submit"
      disabled={disabled}
    >
      {text}
    </button>
  );
}
