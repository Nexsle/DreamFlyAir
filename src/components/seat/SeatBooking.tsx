"use client";

import React, { useState } from "react";
import SeatSelection, { SeatInfo } from "./SeatGrid/SeatGrid";
import styles from "./SeatBooking.module.css";
import SeatSummary from "./SeatSummary/SeatSummary";
import { useSeatStore } from "@/stores/seatStore";
import { useRouter } from "next/navigation";

type SeatBookingProps = {
  rows: number;
  bookedSeats: string[];
};

const SeatBooking: React.FC<SeatBookingProps> = ({ rows, bookedSeats }) => {
  const router = useRouter();

  const selectedSeats = useSeatStore(state => state.selectedSeats);
  const selectSeat = useSeatStore(state => state.selectSeat);
  const deselectSeat = useSeatStore(state => state.deselectSeat);


  // Aircraft configuration
  const seatsPerRow = 6;

  // Define which rows are for each class
  const firstClassRows = [1, 2];
  const businessRows = [3, 4, 5];

  // Pricing configuration
  const prices = {
    Economy: 29.99,
    Business: 39.99,
    "First Class": 49.99,
  };

  const getSeatChar = (seatNumber: number) => {
    return String.fromCharCode(65 + seatNumber);
  };

  //create seats
  const generateSeats = (): SeatInfo[] => {
    const allSeats: SeatInfo[] = [];
    for (let row = 1; row <= rows; row++) {
      for (let seatNumber = 0; seatNumber < seatsPerRow; seatNumber++) {
        const seatLetter = getSeatChar(seatNumber);
        const seatId = `${row}${seatLetter}`;

        let seatType: "Economy" | "Business" | "First Class";
        if (firstClassRows.includes(row)) {
          seatType = "First Class";
        } else if (businessRows.includes(row)) {
          seatType = "Business";
        } else {
          seatType = "Economy";
        }

        let seatPrice = prices[seatType];

        let seatStatus: "Confirmed" | "Selected" | "Booked" = bookedSeats.includes(seatId)
          ? "Booked"
          : "Confirmed";

        allSeats.push({
          id: seatId,
          price: seatPrice,
          type: seatType,
          status: seatStatus,
        });
      }
    }
    return allSeats;
  };

  // Initialize our state with all seats
  const [seats, setSeats] = useState<SeatInfo[]>(generateSeats());

  const handleSeatSelection = (seatId: string): void => {
    const selectedSeat = seats.find(seat => seat.id == seatId); 

    if(!selectedSeat || selectedSeat.status === "Booked") return;

    const isAlreadySelected = selectedSeats.some(seat => seat.seatId == seatId);

    if(isAlreadySelected){
      deselectSeat(seatId);
    }else{
      selectSeat({
        seatId: selectedSeat.id,
        price: selectedSeat.price,
        type: selectedSeat.type,
      })
    }


    setSeats(currentSeat =>
      currentSeat.map(seat => {
        if (seat.id === seatId) {
          if (seat.status == "Booked") {
            return seat;
          }
          // If the seat is Confirmed, change to Selected
          // If the seat is Selected, change to Confirmed
          const newStatus = seat.status === "Confirmed" ? "Selected" : "Confirmed";

          // Return the updated seat object
          return {
            ...seat, // Copy all existing properties
            status: newStatus, // Override the status property
          };
        }

        // For all other seats, return them unchanged
        return seat;
      })
    );
  };

  // const selectedSeats = seats.filter(seat => seat.status === "Selected");

  const handleContinue = () => {
    if(selectedSeats.length === 0){
      alert("Please select at least one seat");
      return;
    }


    console.log("Continue to next step with selected seat: ", selectedSeats);

    router.push("/booking/service");

  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.bookingLayout}>

        <div className={styles.seatMapContainer}>
          <div className={styles.aircraftContainer}>
            <img
              src="/images/longer.png"
              alt="Aircraft Layout"
              className={styles.aircraftImage}
            />
            <div className={styles.seatGridOverlay}>
              <SeatSelection seats={seats} onSeatSelect={handleSeatSelection} />
            </div>
          </div>
        </div>

        <div className={styles.sidebarContainer}>
          <SeatSummary selectedSeats={selectedSeats} onContinue={handleContinue} />
        </div>
      </div>
    </div>
  );
};

export default SeatBooking;
