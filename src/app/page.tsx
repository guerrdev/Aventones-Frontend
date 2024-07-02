'use client'
import styles from "./page.module.css";
import BookingTable from "./aventones/page";

export default function Home() {

  return (
    <main className={styles.main}>
      <h1 className="text-2xl text-bold text-center">Aventones Available</h1>
      <br />
      <div className={styles.table}>
        {/* <BookingTable /> */}
        <br />
        Powered by{" "}
        <span className={styles.center}>
          Aventones. Inc
        </span>
      </div>
    </main>
  );
}
