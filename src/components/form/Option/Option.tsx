"use client";

import { InputContext } from "@/context";
import { use } from "react";
import styles from "./Option.module.css";

interface OptionProps {
  header: string;
  caption: string;
  value?: string;
}

export default function Option({ header, caption, value = header }: OptionProps) {
  const setValue = use(InputContext);

  return (
    <div className={styles.container} onClick={() => setValue(value, header)}>
      <p className={styles.header}>{header}</p>
      <p className={styles.caption}>{caption}</p>
    </div>
  );
}

// export default function Option({ header, caption, value = header }: OptionProps) {
//   const setValue = use(InputContext);

//   return (
//     <div className={styles.container} onClick={() => setValue(value)}>
//       <p className={styles.header}>{header}</p>
//       <p className={styles.caption}>{caption}</p>
//     </div>
//   );
// }
