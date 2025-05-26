"use client";

import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import styles from "./FlightNav.module.css";

export default function FlightNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href ? styles.active : "";
  };

  return (
    <nav className={styles.nav}>
      <Link className={isActive("/booking/flight")} href="/booking/flight">
        <Image src="/svg/plane-solid.svg" width="16" height="16" alt="" />
        Flights
      </Link>
      <Link className={isActive("/booking/baggage")} href="/booking/baggage">
        <Image src="/svg/suitcase-solid.svg" width="16" height="16" alt="" />
        Baggage
      </Link>
      <Link className={isActive("/booking/seat")} href="/booking/seat">
        <Image src="/svg/chair-solid.svg" width="16" height="16" alt="" />
        Seats
      </Link>
      <Link className={isActive("/booking/service")} href="/booking/service">
        <Image src="/svg/bell-concierge-solid.svg" width="16" height="16" alt="" />
        Services
      </Link>
      <Link className={isActive("/booking/detail")} href="/booking/detail">
        <Image src="/svg/clipboard-list-solid.svg" width="16" height="16" alt="" />
        Details
      </Link>
      <Link className={isActive("/booking/payment")} href="/booking/payment">
        <Image src="/svg/cart-shopping-solid.svg" width="16" height="16" alt="" />
        Payment
      </Link>
    </nav>
  );
}
