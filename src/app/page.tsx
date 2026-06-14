import styles from "./page.module.css";

const roomAvailability = [
  { room: "Boardroom A", location: "Floor 1", status: "Available", nextSlot: "11:00 - 12:00" },
  { room: "Boardroom B", location: "Floor 2", status: "Booked", nextSlot: "14:00 - 15:00" },
  { room: "Executive Suite", location: "Floor 3", status: "Available", nextSlot: "13:30 - 14:30" },
];

const invitations = [
  { title: "Quarterly Strategy Review", date: "2026-06-18", room: "Boardroom A", response: "Accepted" },
  { title: "Vendor Alignment Session", date: "2026-06-20", room: "Executive Suite", response: "Pending" },
];

const bookingHistory = [
  { date: "2026-06-01", room: "Boardroom A", duration: "2 hours", status: "Completed" },
  { date: "2026-05-29", room: "Boardroom B", duration: "1 hour", status: "Completed" },
  { date: "2026-05-24", room: "Executive Suite", duration: "90 minutes", status: "Completed" },
];

export default function Home() {
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
                {roomAvailability.map((room) => (
                  <tr key={room.room}>
                    <td>{room.room}</td>
                    <td>{room.location}</td>
                    <td>{room.status}</td>
                    <td>{room.nextSlot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.card} aria-labelledby="booking-heading">
          <h2 id="booking-heading">Create Booking (External Staff Only)</h2>
          <form className={styles.form}>
            <label>
              Staff Type
              <input value="External" readOnly aria-label="Staff Type" />
            </label>
            <label>
              Room
              <select defaultValue="Boardroom A" aria-label="Room">
                <option>Boardroom A</option>
                <option>Boardroom B</option>
                <option>Executive Suite</option>
              </select>
            </label>
            <label>
              Date
              <input type="date" aria-label="Date" />
            </label>
            <label>
              Time
              <input type="time" aria-label="Time" />
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
              <li key={`${item.date}-${item.room}`}>
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
