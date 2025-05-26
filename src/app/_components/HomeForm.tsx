"use client";

import { useBaggageStore } from "@/stores/baggageStore";
import { useFlightStore } from "@/stores/flightStore";
import { useGlobalStore } from "@/stores/globalStore";
import { usePassengerStore } from "@/stores/passengerStore";
import Toast from "components/form/Toast/Toast";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormProps {
  children: React.ReactNode;
  className: string;
}

export default function HomeForm({ children, className }: FormProps) {
  const router = useRouter();
  const [toast, setToast] = useState<{
    message: string;
    type: 'error' | 'success' | 'warning';
  } | null>(null);
  const showToast = (message: string, type: 'error' | 'success' | 'warning' = 'error') => {
    setToast({ message, type });
  };

  const setDetails = useGlobalStore(action => action.setDetails);
  const setPassengers = usePassengerStore(action => action.setPassengers);
  const setDefaultBaggage = useBaggageStore(action => action.setDefault);
  const resetFlight = useFlightStore(action => action.resetFlight);

  const action = (formData: FormData) => {
    const adultList = new Array(Number(formData.get("adult")));
    const childList = new Array(Number(formData.get("children")));
    const infantList = new Array(Number(formData.get("infant")));

    const location = formData.get("location") as string;
    const destination = formData.get("destination") as string;
    const hasReturnFlight = Boolean(formData.get("hasReturnFlight"));
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;

    if (!location || location.trim() === '') {
      showToast('Please select a departure location', 'error');
      return;
    }

    if (!destination || destination.trim() === '') {
      showToast('Please select a destination', 'error');
      return;
    }

    if (!startDate || startDate.trim() === '') {
      showToast('Please select a departure date', 'warning');
      return;
    }

    if (hasReturnFlight && (!endDate || endDate.trim() === '')) {
      showToast('Please select a return date', 'warning');
      return;
    }

    if (location === destination) {
      showToast('Departure and destination cannot be the same', 'error');
      return;
    }

    // Success
    showToast('Searching for flights...', 'success');
    setDetails(location, destination, hasReturnFlight, startDate, endDate);

    // Small delay to show success message
    setTimeout(() => {
      router.push("/booking/flight");
    }, 1000);


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

    // router.push("/booking/flight");
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <Form className={className} action={action}>
        {children}
      </Form>

    </>
  );
}
