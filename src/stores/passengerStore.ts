import Passenger from "@/types/Passenger";
import { create } from "zustand";

interface State {
  adult: Passenger[] | undefined[] | undefined;
  child: Passenger[] | undefined[] | undefined;
  infant: Passenger[] | undefined[] | undefined;
}

interface Actions {
  setPassengers: (adult: Passenger[], child: Passenger[], infant: Passenger[]) => void;
  resetPassengers: () => void;
}

export const usePassengerStore = create<State & Actions>()(set => ({
  adult: [],
  child: [],
  infant: [],

  setPassengers: (adult: Passenger[], child: Passenger[], infant: Passenger[]) =>
    set({ adult: adult, child: child, infant: infant }),

  resetPassengers: () => set({ adult: [], child: [], infant: [] }),
}));
