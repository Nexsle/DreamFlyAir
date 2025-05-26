"use client";

import { set } from "date-fns";
import { RefObject, useRef } from "react";

type PopoverReturn = [
  RefObject<HTMLInputElement | null>,
  RefObject<HTMLInputElement | null>,
  RefObject<HTMLDivElement | null>,
  (value: string, text: string) => void
];

export default function usePopover(): PopoverReturn {
  const textRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const setValue = (value: string, text = value) => {
    inputRef.current!.value = value;
    textRef.current!.value = text;

    popoverRef.current?.hidePopover();
  };

  return [textRef, inputRef, popoverRef, setValue];
}

// type PopoverReturn = [
//   RefObject<HTMLInputElement | null>,
//   RefObject<HTMLDivElement | null>,
//   (value: string) => void
// ];

// export default function usePopover(): PopoverReturn {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const popoverRef = useRef<HTMLDivElement>(null);

//   const setValue = (value: string) => {
//     inputRef.current!.value = value;
//     popoverRef.current?.hidePopover();
//   };

//   return [inputRef, popoverRef, setValue];
// }
