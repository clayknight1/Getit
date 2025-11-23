import styles from "./Button.module.css";

type ButtonProps = {
  text: string;
  onButtonClick?: () => void;
};

export default function Button({ text, onButtonClick }: ButtonProps) {
  return (
    <button className={styles.btnPrimary} onClick={onButtonClick}>
      {text}
    </button>
  );
}
