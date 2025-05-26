import { create } from "zustand";

// interface StoreState {
//   bookingId: string;
//   setBookingId: (newId: string) => void;
// }

// export const useGlobalStore = create<StoreState>()(set => ({
//   bookingId: "fdsa",
//   setBookingId: (newId: string) => set({ bookingId: newId }),
// }));


type BookingInfo = {
  bookingId: string,
  pnr: string,
  passengerId: string,
  seatId: string,
  departingFlightId: string,
  returningFlightId: string,
  bookingTime: Date | null,
  status: 'Confirmed' | "Waitlisted" | "Pending"


  //Actions
  setBookingId: (id: string) => void,
  setPnr: (pnr: string) => void,
  setPassengerId: (id: string) => void,
  setSeatId: (id: string) => void,
  setDepartingFlightId: (id: string) => void,
  setReturningFlightId: (id: string) => void,
  setBookingTime: (time: Date) => void,
  setStatus: (status: 'Confirmed' | "Waitlisted" | "Pending") => void,
  resetBooking: () => void,
}


const bookingInfoStore = create<BookingInfo>()(set => ({
  //inital value
  bookingId: '',
  pnr: '',
  passengerId: '',
  seatId: '',
  departingFlightId: '',
  returningFlightId: '',
  bookingTime: null,
  status: "Pending",

  setBookingId: (id) => set({ bookingId: id }),
  setPnr: (pnr) => set({ pnr }),
  setPassengerId: (id) => set({ passengerId: id }),
  setSeatId: (id) => set({ seatId: id }),
  setDepartingFlightId: (id) => set({ departingFlightId: id }),
  setReturningFlightId: (id) => set({ returningFlightId: id }),
  setBookingTime: (time) => set({ bookingTime: time }),
  setStatus: (status) => set({ status }),
  resetBooking: () => set({
    bookingId: '',
    pnr: '',
    passengerId: '',
    seatId: '',
    departingFlightId: '',
    returningFlightId: '',
    bookingTime: null,
    status: "Pending"
  })
}));

export default bookingInfoStore;
