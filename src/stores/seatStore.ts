import { Seat } from "@/types/Seat";
import { create } from "zustand";

interface State {
    selectedSeats: Seat[];
};

interface Actions {
    selectSeat: (seat: Seat) => void;
    deselectSeat: (seatId: string) => void;
};

export const useSeatStore = create<State & Actions>()(set => ({
    selectedSeats: [],

    selectSeat: (seat) => set((state) =>{
        const isAlreadySelected = state.selectedSeats.some(s => s.seatId === seat.seatId);

        if(isAlreadySelected){
            return state;
        }

        return {
            selectedSeats: [...state.selectedSeats, seat]
        };
    }),

    //only keep the seat which does not match  
    deselectSeat: (seatId) => set((state) =>({
        selectedSeats: state.selectedSeats.filter(
            s => !(s.seatId === seatId)
        )
    }))
}));
