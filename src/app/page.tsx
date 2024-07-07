'use client'
import styles from "./page.module.css";
import BookingTable from "./components/bookingTable/bookingTable";

export default function Home() {

  return (
    <div className={styles.main}>
      <main className={styles.main}>
        <BookingTable />
        <br />
        Powered by{" "}
        <span className={styles.center}>
          Aventones. Inc
        </span>
      </main>
    </div>
  );
}
