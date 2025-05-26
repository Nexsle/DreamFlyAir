import { create } from "zustand";

interface State {
  bookingId: string;
  location: string;
  destination: string;
  hasReturnFlight: boolean;
  departureDate: string;
  returnDate: string;
}

interface Actions {
  setBookingId: (newId: string) => void;
  setDetails: (location: string, destination: string, hasReturnFlight: boolean, departureDate: string, returnDate: string) => void;
}

export const useGlobalStore = create<State & Actions>()(set => ({
  bookingId: "",

  location: "",
  destination: "",
  hasReturnFlight: false,
  departureDate: "",
  returnDate: "",

  setBookingId: (newId: string) => set({ bookingId: newId }),

  setDetails: (location: string, destination: string, hasReturnFlight: boolean, departureDate: string, returnDate: string) =>
    set({
      location: location,
      destination: destination,
      hasReturnFlight: hasReturnFlight,
      departureDate: departureDate,
      returnDate: returnDate,
    }),
}));
