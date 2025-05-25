import { Baggage, BaggageType } from "@/types/Baggage";
import { create } from "zustand";

interface State {
  depart: Baggage[] | [];
  return: Baggage[] | [];
}

interface Actions {
  setDefault: (baggageList: Baggage[]) => void;

  setDepart: (baggage: Baggage, index: number) => void;
  setReturn: (baggage: Baggage, index: number) => void;
}

export const useBaggageStore = create<State & Actions>()(set => ({
  depart: [],
  return: [],

  setDefault: baggageList => set({ depart: baggageList, return: baggageList }),

  setDepart: (baggage, index) =>
    set(state => ({
      depart: state.depart.map((v, i) => {
        if (i === index) return baggage;
        else return v;
      }),
    })),

  setReturn: (baggage, index) =>
    set(state => ({
      return: state.return.map((v, i) => {
        if (i === index) return baggage;
        else return v;
      }),
    })),
}));
