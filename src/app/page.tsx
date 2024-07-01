'use client'
import styles from "./page.module.css";
import BookingTable from "./components/bookingTable/bookingTable";

export default function Home() {

  return (
    <main className={styles.main}>
      <h1>Aventones Available</h1>
      <div className={styles.table}>
        <BookingTable />
<br />
        Powered by{" "}
        <span className={styles.center}>
          Aventones. Inc
        </span>
      </div>
    </main>
  );
}
