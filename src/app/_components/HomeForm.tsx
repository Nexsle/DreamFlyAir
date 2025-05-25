"use client";

import { useBaggageStore } from "@/stores/baggageStore";
import { useFlightStore } from "@/stores/flightStore";
import { useGlobalStore } from "@/stores/globalStore";
import { usePassengerStore } from "@/stores/passengerStore";
import Form from "next/form";
import { useRouter } from "next/navigation";

interface FormProps {
  children: React.ReactNode;
  className: string;
}

export default function HomeForm({ children, className }: FormProps) {
  const router = useRouter();

  const setDetails = useGlobalStore(action => action.setDetails);
  const setPassengers = usePassengerStore(action => action.setPassengers);
  const setDefaultBaggage = useBaggageStore(action => action.setDefault);
  const resetFlight = useFlightStore(action => action.resetFlight);

  const action = (formData: FormData) => {
    const adultList = new Array(Number(formData.get("adult")));
    const childList = new Array(Number(formData.get("children")));
    const infantList = new Array(Number(formData.get("infant")));

    // reset previously selected flights
    // probably could use zustand slices pattern later to reset everything at once
    resetFlight();

    // set global details
    setDetails(
      formData.get("location") as string,
      formData.get("destination") as string,
      Boolean(formData.get("hasReturnFlight")),
      formData.get("startDate") as string,
      formData.get("endDate") as string
    );

    // set empty passenger arrays
    setPassengers(adultList, childList, infantList);

    // set default baggage
    setDefaultBaggage([
      ...adultList.fill({ weight: 0, price: 0, type: "adult" }),
      ...childList.fill({ weight: 0, price: 0, type: "child" }),
      ...infantList.fill({ weight: 0, price: 0, type: "infant" }),
    ]);

    router.push("/booking/flight");
  };

  return (
    <Form className={className} action={action}>
      {children}
    </Form>
  );
}
