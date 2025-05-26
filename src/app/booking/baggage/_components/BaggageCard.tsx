"use client";

import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import { Baggage, BaggageRate } from "@/types/Baggage";
import { use } from "react";
import { BaggageContext } from "@/context";
import styles from "./BaggageCard.module.css";

interface BaggageCardProps {
  baggage: Baggage;
  index: number;
}

export default function BaggageCard({ baggage, index }: BaggageCardProps) {
  const setBaggage = use(BaggageContext);

  // counter functions
  const increment = () => setBaggage(update(1), index);
  const decrement = () => (baggage.weight > 0 ? setBaggage(update(-1), index) : undefined);

  // helper function
  const update = (step: number): Baggage => {
    const weight = baggage.weight + step;
    const price = weight * BaggageRate[baggage.type];

    return { weight: weight, price: price, type: baggage.type };
  };

  return (
    <div className={styles.container}>
      <p className={styles.header}>{baggage.type}</p>

      <span className={styles.incrementer}>
        <button className={styles.button} onClick={increment}>
          <PlusIcon width="16" height="16" />
        </button>

        <p className={styles.weight}>{baggage.weight} kg</p>

        <button className={styles.button} onClick={decrement}>
          <MinusIcon width="16" height="16" />
        </button>
      </span>

      <p className={styles.price}>${baggage.price}</p>
    </div>
  );
}
