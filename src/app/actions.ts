"use server";

import flightReviver from "@/utils/flightReviver";
import Flight from "@/types/Flight";
import Airport from "@/types/Airport";
import path from "path";

export async function getFlights(): Promise<Array<Flight>> {
  const data = await fetch(process.env.API_URL!, { cache: "force-cache" });
  const text = await data.text();
  return await JSON.parse(text, flightReviver);
}

export async function getAirports(): Promise<Array<Airport>> {
  const data = await fetch(path.join(process.env.API_URL!, "airport"), { cache: "force-cache" });
  return await data.json();
}
