"use client";
import styles from "./pass.module.css";

export default function Baggage() {
  const mockDepartingFlight = {
    flightName: "JFK",
    location: "London",
    date: new Date("2025/03/28").toDateString(),
    time: new Date().toTimeString()
  };

  const mockArrivingFlight = {
    flightName: "LHR",
    location: "Kokomo?",
    date: new Date("2025/03/30").toDateString(),
    time: new Date().toTimeString()
  };

  const mockData = [
      {id: 1234567890,departingFlight: mockDepartingFlight, arrivingFlight: mockArrivingFlight, passenger: "Dylan Williams", flight: "Boeing 737", seat: "8A", gate:"B", terminal:"X"},
      {id: 2345678901, departingFlight: mockDepartingFlight, arrivingFlight: mockArrivingFlight, passenger: "Ryan Williams", flight: "Boeing 737", seat: "8B", gate:"B", terminal:"X"},
      {id: 3456789012, departingFlight: mockDepartingFlight, arrivingFlight: mockArrivingFlight, passenger: "Kokomo Williams", flight: "Boeing 737", seat: "8C", gate:"B", terminal:"X"},
      {id: 3456789012, departingFlight: mockDepartingFlight, arrivingFlight: mockArrivingFlight, passenger: "Kokomo Williams", flight: "Boeing 737", seat: "8C", gate:"B", terminal:"X"},
      {id: 3456789012, departingFlight: mockDepartingFlight, arrivingFlight: mockArrivingFlight, passenger: "Kokomo Williams", flight: "Boeing 737", seat: "8C", gate:"B", terminal:"X"},
      {id: 3456789012, departingFlight: mockDepartingFlight, arrivingFlight: mockArrivingFlight, passenger: "Kokomo Williams", flight: "Boeing 737", seat: "8C", gate:"B", terminal:"X"},
      {id: 3456789012, departingFlight: mockDepartingFlight, arrivingFlight: mockArrivingFlight, passenger: "Kokomo Williams", flight: "Boeing 737", seat: "8C", gate:"B", terminal:"X"},
    ];
  
  return (
    <div className={styles.passContainer}>
      {mockData.map((ticket, index) => 
        (
          <div key={index} className={styles.passTicket}>
            <div className={styles.passFlight}>
              <div>
                <h1>{ticket.departingFlight.flightName}</h1>
                <h2>{ticket.departingFlight.location}</h2>
                <p>{ticket.departingFlight.date}</p>
                <p>{ticket.departingFlight.time}</p>
              </div>
              <div>
                <h1>{ticket.arrivingFlight.flightName}</h1>
                <h2>{ticket.arrivingFlight.location}</h2>
                <p>{ticket.arrivingFlight.date}</p>
                <p>{ticket.arrivingFlight.time}</p>
              </div>
            </div>
            <div className={styles.passDetails}>
              <div>
                <h3>Passenger</h3>
                <p>{ticket.passenger}</p>
              </div>
              <div>
                <h3>Flight</h3>
                <p>{ticket.flight}</p>
              </div>
            </div>
            <div className={styles.passDetails}>
              <div>
                <h3>Seat</h3>
                <p>{ticket.seat}</p>
              </div>
              <div>
                <h3>Gate</h3>
                <p>{ticket.gate}</p>
              </div>
              <div>
                <h3>Terminal</h3>
                <p>{ticket.terminal}</p>
              </div>
            </div>
            <div className={styles.passBarcode}>
              {ticket.id}
            </div>
          </div>
        )
      )}
    </div>
  );
}
