"use server";

import { Option } from "@/components/form";
import locations from "@/public/data/locations";
import Airport from "@/types/Airport";
import { getAirports } from "app/actions";

// probably should be a type
interface Location {
  city: string;
  country: string;
  code: string;
}

export default async function Locations() {
  const airports = await getAirports();
  return (
    <>
      {locations.map((location: Location) => (
        <Option
          key={location.code}
          header={`${location.city} - ${location.code}`}
          caption={location.country}
          value={location.code}
        />
      ))}
    </>
  );
}

// export default async function Locations() {
//   const airports = await getAirports();

//   return (
//     <>
//       {locations.map((location: Location) => (
//         <Option
//           key={location.code}
//           header={`${location.city} - ${location.code}`}
//           caption={location.country}
//           value={location.code}
//         />
//       ))}
//     </>
//   );
// }

// export default async function Locations() {
//   return (
//     <>
//       {locations.map((location: Location) => (
//         <Option
//           key={location.code}
//           header={`${location.city} - ${location.code}`}
//           caption={location.country}
//         />
//       ))}
//     </>
//   );
// }

// export default async function Locations() {
//   return (
//     <span style={{ position: "absolute", top: "12px", left: "0px", width: "500px" }}>
//       <Card>
//         {locations.map((location: Location) => (
//           <Option
//             key={location.code}
//             header={`${location.city} - ${location.code}`}
//             caption={location.country}
//           />
//         ))}
//       </Card>
//     </span>
//   );
// }
