import React from "react";
import { SeatInfo } from "../SeatGrid/SeatGrid";
import styles from "./SeatSummary.module.css";
import { Seat } from "@/types/Seat";

type SeatSummaryProps = {
  selectedSeats: Seat[];
  onContinue: () => void;
};

const SeatSummary: React.FC<SeatSummaryProps> = ({ selectedSeats, onContinue }) => {
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className={styles.summary}>
      <h3>Selected Seats ({selectedSeats.length})</h3>

      {selectedSeats.length === 0 ? (
        <p>No seat has been selected</p>
      ) : (
        <>
          <div className={styles.selectedSeatsGrid}>
            {selectedSeats.map(seat => (
              <div key={seat.seatId} className={styles.selectedSeatItem}>
                <div className={styles.seatId}>{seat.seatId}</div>
                <div className={styles.seatType}>{seat.type}</div>
                <div className={styles.seatPrice}>${seat.price.toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className={styles.totalContainer}>
            <span className={styles.totalLabel}>Total</span>
            <span className={styles.totalAmount}>${totalPrice.toFixed(2)}</span>
          </div>
        </>
      )}

      <button
        className={styles.continueButton}
        onClick={onContinue}
        disabled={selectedSeats.length === 0}
      >
        Continue
      </button>
    </div>
  );
};

export default SeatSummary;
