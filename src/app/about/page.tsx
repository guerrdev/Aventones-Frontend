import Image from "next/image";
import styles from "../page.module.css";

export default function AboutPage() {
    return (
        <div>
            <h1 className={styles.ola}>About</h1>
            <p>This is the about page</p>
        </div>
    );
}