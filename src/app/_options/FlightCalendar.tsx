"use client";

import { useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/style.css";

export default function FlightCalendar() {
  const [selected, setSelected] = useState<Date>();

  return (
    <DayPicker
      animate
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."}
    />
  );
}
