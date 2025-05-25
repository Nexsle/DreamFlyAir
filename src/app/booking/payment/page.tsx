"use client";
import styles from "./payment.module.css";

export default function Baggage() {
  const mockData = {
    tickets: [
      { type: "Adult Departing", count: 2, price: 20 },
      { type: "Child Departing", count: 2, price: 20 },
      { type: "Adult Arriving", count: 1, price: 20 },
      { type: "Child Arriving", count: 1, price: 20 },
    ],
    drinks: [
      { name: "Whisky", count: 3, price: 120 },
      { name: "Beer", count: 16, price: 460 },
    ],
    food: [{ name: "Wagyu Burger", count: 99, price: 69 }],
  };
  const ticketTotal = mockData.tickets.reduce((sum, ticket) => sum + ticket.price, 0);
  const drinksTotal = mockData.drinks.reduce((sum, drink) => sum + drink.price, 0);
  const foodTotal = mockData.drinks.reduce((sum, food) => sum + food.price, 0);

  // No idea what the tax should be lol
  const taxTotal = Math.round((ticketTotal + drinksTotal + foodTotal) / 15);

  const finalTotal = ticketTotal + drinksTotal + foodTotal + taxTotal;

  return (
    <div className={styles.splitSection}>
      <section className={styles.details}>
        <div>
          <div className={styles.detailBreakup}>
            <h1 className={styles.heading2}>Tickets</h1>
            <h1 className={styles.heading2}>$100</h1>
          </div>
          {mockData.tickets.map((ticket, index) => (
            <div key={index} className={styles.detailsItem}>
              <p>{ticket.type}</p>
              <p>x{ticket.count}</p>
              <p>${ticket.price}</p>
            </div>
          ))}
        </div>

        <div>
          <div className={styles.detailBreakup}>
            <h1 className={styles.heading2}>Beverages</h1>
            <h2 className={styles.heading2}>$100</h2>
          </div>
          {mockData.food.map((food, index) => (
            <div key={index} className={styles.detailsItem}>
              <p>{food.name}</p>
              <p>x{food.count}</p>
              <p>${food.price}</p>
            </div>
          ))}
        </div>

        <div>
          <div className={styles.detailBreakup}>
            <h1 className={styles.heading2}>Food</h1>
            <h1 className={styles.heading2}>$100</h1>
          </div>
          {mockData.drinks.map((drink, index) => (
            <div key={index} className={styles.detailsItem}>
              <p>{drink.name}</p>
              <p>x{drink.count}</p>
              <p>${drink.price}</p>
            </div>
          ))}
        </div>

        <div className={styles.detailBreakup}>
          <h1 className={styles.heading2}>Tax</h1>
          <h1 className={styles.heading2}>${taxTotal}</h1>
        </div>

        <div className={styles.detailBreakup}>
          <h1 className={styles.heading1}>Total</h1>
          <h1 className={styles.heading1}>${finalTotal}</h1>
        </div>
      </section>

      <section className={styles.payment}>
        <h2 className={styles.heading2}>Payment</h2>
        <p>Payment amount</p>
        <h1>${finalTotal}</h1>
        <form action="uhhh" className={styles.paymentForm}>
          <label className={styles.paymentDetails}>
            <p>Name on card</p>
            <input type="text" name="name" />
          </label>

          <label className={styles.paymentDetails}>
            <p>Card number</p>
            <input type="text" name="card" />
          </label>

          <div className={styles.expiryAndCode}>
            <div>
              <p>Expiry Date</p>
              <input type="date" name="expiry" placeholder="MM / YY" />
            </div>

            <div>
              <p>Security Code</p>
              <input type="password" name="code" />
            </div>
          </div>

          <label className={styles.paymentDetails}>
            <p>ZIP/Postal code</p>
            <input type="text" name="zip" />
          </label>

          <button className={styles.paymentButton}>Pay ${finalTotal}</button>
        </form>
      </section>
    </div>
  );
}
