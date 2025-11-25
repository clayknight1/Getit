// import { useFormStatus } from "react-dom";
import styles from "./Button.module.css";
// const { pending, data } = useFormStatus();

type ButtonProps = {
  text: string;
  onButtonClick?: () => void;
};

export default function Button({ text, onButtonClick }: ButtonProps) {
  return (
    <button className={styles.btnPrimary} onClick={onButtonClick} type="submit">
      {text}
    </button>
  );
}
