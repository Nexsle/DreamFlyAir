import { NextRequest } from "next/server";
import { sql } from "@/database";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // clean search params
  const location = searchParams.get("location");
  const destination = searchParams.get("destination");
  const hasReturn = Boolean(searchParams.get("hasReturnFlight"));
  const departureDate = searchParams.get("departureDate");
  const returnDate = searchParams.get("returnDate");

  if (!location || !destination || location.trim() === "" || destination.trim() === "") {
    return Response.json({
      departing: [],
      returning: [],
      error: "Location and destination are required",
    });
  }

  console.log("API params:", { location, destination, hasReturn, departureDate, returnDate });

  try {
    const departingFlights = await GetFlights(location, destination, departureDate);

    // dont query return if one way
    const returningFlights =
      hasReturn && returnDate && returnDate.trim() !== ""
        ? await GetFlights(destination, location, returnDate)
        : [];

    return Response.json({
      departing: departingFlights || [],
      returning: returningFlights || [],
    });
  } catch (error) {
    console.error("Database error:", error);
    return Response.json(
      {
        departing: [],
        returning: [],
        error: "Failed to fetch flights",
      },
      { status: 500 }
    );
  }
}

async function GetFlights(start: string | null, finish: string | null, date: string | null) {
  if (!start || !finish) {
    return [];
  }

  let flights;

  if (date && date.trim() !== "") {
    flights = await sql`
    SELECT 
      flight_id AS id,
      source_airport_id AS location,
      destination_airport_id AS destination,
      departure_time AS departure,
      arrival_time AS arrival,
      plane_type_id AS plane,
      price AS price
    FROM flight_details
    WHERE source_airport_id = ${start}
    AND destination_airport_id = ${finish}
    AND Date(departure_time) = ${date}
    ORDER BY departure_time

  `;
  } else {
    flights = await sql`
    SELECT 
      flight_id AS id,
      source_airport_id AS location,
      destination_airport_id AS destination,
      departure_time AS departure,
      arrival_time AS arrival,
      plane_type_id AS plane,
      price AS price
    FROM flight_details
    WHERE source_airport_id = ${start}
    AND destination_airport_id = ${finish}
    AND Date(departure_time) >= CURRENT_DATE
    ORDER BY departure_time

  `;
  }

  return flights;
}
