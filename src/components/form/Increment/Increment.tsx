"use client";

import useIncrement from "@/hooks/useIncrement";
import styles from "./Increment.module.css";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import { useRef } from "react";

// interface RefObject<T> {
//   current: T;
// }

// export const DialogContext = createContext<React.RefObject<HTMLDialogElement | null> | null>(null);

interface IncrementProps {
  name: string;
  label: string;
}

export default function Increment({ name, label }: IncrementProps) {
  let [ref, increment, decrement] = useIncrement();

  const defaultValue = name === "adult" ? 1 : 0

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>

      <span className={styles.container}>
        <button type="button" className={styles.btn} onClick={decrement}>
          <MinusIcon width="16px" height="16px" />
        </button>
        <input
          className={styles.counter}
          id={name}
          name={name}
          ref={ref}
          defaultValue={defaultValue}
          type="number"
          min={defaultValue}
          step="1"
        />
        <button type="button" className={styles.btn} onClick={increment}>
          <PlusIcon width="16px" height="16px" />
        </button>
      </span>
    </div>
  );
}
