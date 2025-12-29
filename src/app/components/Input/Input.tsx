"use client";
import * as React from "react";
import styles from "./Input.module.css";

type Props = React.ComponentProps<"input"> & { label?: string };

export function Input({ label, ...props }: Props) {
  const id = props.id ?? React.useId();

  return (
    <div>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <input className={styles.input} id={id} {...props} />
    </div>
  );
}
