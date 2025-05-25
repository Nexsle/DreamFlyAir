"use client";

import { BaggageContext } from "@/context";
import BaggageCard from "./_components/BaggageCard";

import Continue from "../_components/Continue";
import { useBaggageStore } from "@/stores/baggageStore";
import styles from "./baggage.module.css";
import { useGlobalStore } from "@/stores/globalStore";

export default function BaggagePage() {
  const hasReturn = useGlobalStore(state => state.hasReturnFlight);

  const departing = useBaggageStore(state => state.depart);
  const returning = useBaggageStore(state => state.return);

  const setDepart = useBaggageStore(action => action.setDepart);
  const setReturn = useBaggageStore(action => action.setReturn);

  const total =
    departing.reduce((acc, item) => acc + item.price, 0) +
    returning.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h1 className={styles.heading}>Baggage</h1>

      <section>
        <h2 className={styles.heading2}>Departing Flight</h2>

        <BaggageContext.Provider value={setDepart}>
          {departing.map((baggage, i) => (
            <BaggageCard baggage={baggage} index={i} key={i} />
          ))}
        </BaggageContext.Provider>

        {hasReturn && (
          <>
            <h2 className={styles.heading2}>Arriving Flight</h2>
            <BaggageContext.Provider value={setReturn}>
              {returning.map((baggage, i) => (
                <BaggageCard baggage={baggage} index={i} key={i} />
              ))}
            </BaggageContext.Provider>
          </>
        )}

        <Continue link="./seat" price={total} />
      </section>
    </div>
  );
}
