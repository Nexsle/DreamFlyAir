import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <span className={styles.logo}>
        <Link href="/">DreamFlyAir</Link>
      </span>
      {/* This links are just for testing */}
      {/* <span className={styles.container}>
        <Link href="/booking/flight">Flights</Link>
        <Link href="/booking/baggage">Baggage</Link>
        <Link href="/booking/seat">Seats</Link>
        <Link href="/booking/service">Services</Link>
        <Link href="/booking/detail">Details</Link>
        <Link href="/booking/payment">Payment</Link>
      </span> */}
      <span className={styles.container}>
        {/* this didn't make the final cut */}
        {/* <button className={styles.edit} popoverTarget="findBooking">
          Booking
        </button>
        <div className={styles.content} id="findBooking" popover="auto">
          <p>Test</p>
        </div> */}
        {/* <Link href="">Booking</Link> */}
        <Link href="/help">Help</Link>
      </span>
    </nav>
  );
}
