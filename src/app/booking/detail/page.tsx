"use client";

import Passenger from "@/types/Passenger";
import styles from "./page.module.css";
import PassengerCard from "./Passenger";
import Continue from "../_components/Continue";
import { useGlobalStore } from "@/stores/globalStore";

// two different testing objects for different scenarios
const passengerUnkown: Array<Passenger> = [
  { id: 0, type: "Adult" },
  { id: 1, type: "Adult" },
  { id: 2, type: "Child" },
  { id: 3, type: "Child" },
  { id: 4, type: "Infant" },
  { id: 5, type: "Infant" },
];

const passengersKnown: Array<Passenger> = [
  { id: 0, type: "Adult", title: "Mr", firstName: "Thomas", lastName: "McGrath" },
  { id: 1, type: "Child", title: "Mr", firstName: "Sammy", lastName: "Junior" },
  { id: 2, type: "Infant", title: "Mr" },
  { id: 3, type: "Infant", title: "Mr" },
];

const typeCounter = {
  Adult: 0,
  Child: 0,
  Infant: 0,
};

export default function Details() {
  const total = 0;
  const DATA = passengerUnkown;

  return (
    <>
      <section className={styles.section}>
        <div className={styles.contact}>
          <h1 className={styles.heading}>Contact Information</h1>

          <span>
            <label htmlFor="title">Title</label>
            <select name="title" id="title">
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
            </select>
          </span>

          <span>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" />
          </span>

          <span>
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" />
          </span>

          <span>
            <label htmlFor="postcode">Postcode</label>
            <input id="postcode" name="postcode" type="number" />
          </span>

          <span>
            <label htmlFor="email">Email Address</label>
            <input id="email" name="email" type="email" />
          </span>

          <span>
            <label htmlFor="country">Country</label>
            <select name="country" id="country">
              <option value="+61">Australia</option>
            </select>
          </span>

          <span>
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" name="phone" type="tel" />
          </span>
        </div>
      </section>
      <Continue price={total} link="./payment" />
    </>
  );
}
