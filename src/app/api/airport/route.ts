import { sql } from "@/database";

export async function GET() {
  const airports = await sql`
    SELECT airport_id AS id, city, country
    FROM Airports
    WHERE country = 'Australia'`;

  return Response.json(airports);
}
