"use client";

import { DateRange, DayPicker } from "react-day-picker";
import { ChangeEvent, use, useState } from "react";
import { InputContext } from "@/context";

import { getIsoDate, getLocalDate } from "utils/formatDate";
import styles from "./FlightCalendar.module.css";
import "react-day-picker/style.css";

export default function FlightCalendar() {
  const setValue = use(InputContext);

  const [dateRange, setDateRange] = useState<DateRange>();
  const [hasReturn, setHasReturn] = useState<Boolean>(true);

  // interaction events
  const setSingleDate = (date: Date) => setDateRange({ ...dateRange, from: date });

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setHasReturn(true);
    else setHasReturn(false);
  };

  // popover submission events
  const handleReset = () => setDateRange(undefined);

  const handleConfirm = () => {
    const start = `${getLocalDate(dateRange?.from)}`;
    const end = dateRange?.to ? ` - ${getLocalDate(dateRange?.to)}` : "";
    setValue(start + end);
  };

  return (
    <div className={styles.container}>
      <span className={styles.top}>
        <label>
          <input
            className={styles.radio}
            onChange={handleToggle}
            type="radio"
            name="hasReturnFlight"
            value="true"
            defaultChecked
          />
          Return
        </label>

        <label>
          <input
            className={styles.radio}
            onChange={handleToggle}
            type="radio"
            name="hasReturnFlight"
            value=""
          />
          One way
        </label>
      </span>

      {hasReturn ? (
        <DayPicker
          className={styles.calendar}
          animate
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          footer={
            dateRange
              ? `Selected: ${dateRange?.from?.toLocaleDateString(
                  "en"
                )} - ${dateRange?.to?.toLocaleDateString("en")}`
              : "Pick a day."
          }
        />
      ) : (
        <DayPicker
          className={styles.calendar}
          animate
          mode="single"
          selected={dateRange?.from}
          onSelect={setSingleDate}
          footer={
            dateRange?.from ? `Selected: ${dateRange.from.toLocaleDateString("en")}` : "Pick a day."
          }
          required
        />
      )}

      <span className={styles.bottom}>
        <button type="button" className={styles.reset} onClick={handleReset}>
          Reset
        </button>
        <button type="button" className={styles.confirm} onClick={handleConfirm}>
          Confirm
        </button>
      </span>

      {/* this is for the formData */}
      <input type="hidden" name="startDate" value={getIsoDate(dateRange?.from) || ""} />
      <input type="hidden" name="endDate" value={getIsoDate(dateRange?.to) || ""} />
    </div>
  );
}
