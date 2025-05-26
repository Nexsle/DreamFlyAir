"use client";

import Flight from "@/types/Flight";
import { SelectedContext } from "@/context";
import FlightCard from "./_components/FlightCard";
import Continue from "../_components/Continue";
import useSWR from "swr";

import flightReviver from "@/utils/flightReviver";
import { useFlightStore } from "stores/flightStore";
import styles from "./flight.module.css";
import { useGlobalStore } from "@/stores/globalStore";
import { useShallow } from "zustand/shallow";

const URL = process.env.NEXT_PUBLIC_API_URL + "/booking/flight?";

const fetcher = async (searchParams: URLSearchParams) => {
  const response = await fetch(URL + searchParams);
  const data = await response.text();
  return await JSON.parse(data, flightReviver);
};

export default function FlightPage() {
  const details = useGlobalStore(
    useShallow(state => {
      return {
        location: state.location || "",
        destination: state.destination || "",
        hasReturnFlight: state.hasReturnFlight ? "true" : "",
        departureDate: state.departureDate || "",
        returnDate: state.returnDate || "",
      };
    })
  );

  const getDepart = useFlightStore(state => state.departFlight);
  const getReturn = useFlightStore(state => state.returnFlight);

  const setDepart = useFlightStore(state => state.setDepartFlight);
  const setReturn = useFlightStore(state => state.setReturnFlight);

  const searchParams = new URLSearchParams(details);
  const { data } = useSWR("flights", () => fetcher(searchParams));

  const totalPrice = (getDepart?.price || 0) + (getReturn?.price || 0);

  // Show loading until data is fetched
  if (!data) {
    return <div className={styles.pageContainer}>Loading flights...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Flights</h1>

      <section className={styles.flightSelection}>
        <h2 className={styles.heading2}>Departing Flights</h2>

        <SelectedContext.Provider value={[getDepart, setDepart]}>
          {data.departing.map((flight: Flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </SelectedContext.Provider>

        <SelectedContext.Provider value={[getReturn, setReturn]}>
          <h2 className={styles.heading2}>Returning Flights</h2>
          {data.returning.map((flight: Flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </SelectedContext.Provider>

        <Continue price={totalPrice} link="./baggage" />
      </section>
    </div>
  );
}
