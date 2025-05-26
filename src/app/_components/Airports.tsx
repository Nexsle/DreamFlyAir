"use server";

import { Option } from "@/components/form";
import { getAirports } from "app/actions";

export default async function Airports() {
  const airports = await getAirports();

  return (
    <>
      {airports.map(airport => (
        <Option
          key={airport.id}
          header={`${airport.city} - ${airport.id}`}
          caption={airport.country}
          value={airport.id}
        />
      ))}
    </>
  );
}
