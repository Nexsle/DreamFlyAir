import { create } from "zustand";

import Flight from "@/types/Flight";

interface State {
  returnFlight: Flight | undefined;
  departFlight: Flight | undefined;
}

interface Actions {
  setReturnFlight: (flight: Flight) => void;
  setDepartFlight: (flight: Flight) => void;

  resetFlight: () => void;
}

export const useFlightStore = create<State & Actions>()(set => ({
  returnFlight: undefined,
  departFlight: undefined,

  setReturnFlight: (flight: Flight) => set({ returnFlight: flight }),
  setDepartFlight: (flight: Flight) => set({ departFlight: flight }),

  resetFlight: () => set({ returnFlight: undefined, departFlight: undefined }),
}));
