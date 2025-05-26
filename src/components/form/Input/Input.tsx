"use client";

import { useId } from "react";
import { InputContext } from "@/context";

import styles from "./Input.module.css";
import usePopover from "@/hooks/usePopover";

export interface FormInput {
  name: string;
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

interface InputProps extends FormInput {
  placeholder: string;
  disabled?: boolean;
}

export default function Input({ name, label, placeholder, icon, children }: InputProps) {
  const [textRef, inputRef, popoverRef, setValue] = usePopover();
  const id = useId();

  return (
    <>
      <button className={styles.container} type="button" popoverTarget={id}>
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
        <input
          id={name}
          name={name}
          ref={textRef}
          className={styles.input}
          placeholder={placeholder}
          disabled
          readOnly
        />
        <input type="hidden" ref={inputRef} name={name} />
        <span className={styles.icon}>{icon}</span>
      </button>

      <InputContext value={setValue}>
        <div id={id} ref={popoverRef} className={styles.content} popover="auto">
          {children}
        </div>
      </InputContext>
    </>
  );
}

// export default function Input({
//   name,
//   label,
//   placeholder,
//   icon,
//   disabled = false,
//   children,
// }: InputProps) {
//   const [inputRef, popoverRef, setValue] = usePopover();
//   const id = useId();

//   return (
//     <>
//       <button className={styles.container} type="button" popoverTarget={id}>
//         <label htmlFor={name} className={styles.label}>
//           {label}
//         </label>
//         <input
//           id={name}
//           name={name}
//           ref={inputRef}
//           className={styles.input}
//           placeholder={placeholder}
//           disabled={disabled}
//           readOnly
//         />
//         <span className={styles.icon}>{icon}</span>
//       </button>

//       <InputContext value={setValue}>
//         <div id={id} ref={popoverRef} className={styles.content} popover="auto">
//           {children}
//         </div>
//       </InputContext>
//     </>
//   );
// }
