"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";

type HistoryItem = {
  date: string;
  room: string;
  duration: string;
  status: string;
};

const roomAvailability = [
  { room: "Boardroom A", location: "Floor 1", status: "Available", nextSlot: "11:00 - 12:00" },
  { room: "Boardroom B", location: "Floor 2", status: "Booked", nextSlot: "14:00 - 15:00" },
  { room: "Executive Suite", location: "Floor 3", status: "Available", nextSlot: "13:30 - 14:30" },
];

const invitations = [
  { title: "Quarterly Strategy Review", date: "2026-06-18", room: "Boardroom A", response: "Accepted" },
  { title: "Vendor Alignment Session", date: "2026-06-20", room: "Executive Suite", response: "Pending" },
];

const initialBookingHistory: HistoryItem[] = [
  { date: "2026-06-01", room: "Boardroom A", duration: "2 hours", status: "Completed" },
  { date: "2026-05-29", room: "Boardroom B", duration: "1 hour", status: "Completed" },
  { date: "2026-05-24", room: "Executive Suite", duration: "90 minutes", status: "Completed" },
];

const formatDuration = (from: string) => {
  if (!from) {
    return "Pending";
  }

  const [hours, minutes] = from.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  const endMinutes = totalMinutes + 60;
  const endHours = Math.floor(endMinutes / 60)
    .toString()
    .padStart(2, "0");
  const endMins = (endMinutes % 60).toString().padStart(2, "0");
  return `${from} - ${endHours}:${endMins}`;
};

export default function Home() {
  const [room, setRoom] = useState("Boardroom A");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookingHistory, setBookingHistory] = useState(initialBookingHistory);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!date || !time) {
      return;
    }

    const newBooking: HistoryItem = {
      room,
      date,
      duration: formatDuration(time),
      status: "Confirmed",
    };

    setBookingHistory((previous) => [newBooking, ...previous]);
    setDate("");
    setTime("");
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.hero}>
          <h1>Boardroom Management System</h1>
          <p>
            Check availability, create external-staff bookings, manage invitations, and review your
            booking history from any device.
          </p>
        </header>

        <section className={styles.card} aria-labelledby="availability-heading">
          <h2 id="availability-heading">Room Availability</h2>
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Next Slot</th>
                </tr>
              </thead>
              <tbody>
                {roomAvailability.map((entry) => (
                  <tr key={entry.room}>
                    <td>{entry.room}</td>
                    <td>{entry.location}</td>
                    <td>{entry.status}</td>
                    <td>{entry.nextSlot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.card} aria-labelledby="booking-heading">
          <h2 id="booking-heading">Create Booking (External Staff Only)</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              Staff Type
              <input value="External" readOnly aria-label="Staff Type" />
            </label>
            <label>
              Room
              <select value={room} onChange={(event) => setRoom(event.target.value)} aria-label="Room">
                <option>Boardroom A</option>
                <option>Boardroom B</option>
                <option>Executive Suite</option>
              </select>
            </label>
            <label>
              Date
              <input
                type="date"
                aria-label="Date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </label>
            <label>
              Time
              <input
                type="time"
                aria-label="Time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                required
              />
            </label>
            <button type="submit">Submit Booking</button>
          </form>
        </section>

        <section className={styles.card} aria-labelledby="invitations-heading">
          <h2 id="invitations-heading">Invitations</h2>
          <ul className={styles.list}>
            {invitations.map((invitation) => (
              <li key={`${invitation.title}-${invitation.date}`}>
                <strong>{invitation.title}</strong>
                <span>{invitation.room}</span>
                <span>{invitation.date}</span>
                <span>{invitation.response}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.card} aria-labelledby="history-heading">
          <h2 id="history-heading">Booking History</h2>
          <ul className={styles.list}>
            {bookingHistory.map((item) => (
              <li key={`${item.date}-${item.room}-${item.duration}`}>
                <strong>{item.room}</strong>
                <span>{item.date}</span>
                <span>{item.duration}</span>
                <span>{item.status}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
