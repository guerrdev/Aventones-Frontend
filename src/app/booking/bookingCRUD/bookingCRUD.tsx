import React from "react";
import { useState } from "react";
import styles from "./bookingCRUD.module.css";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { DatePicker } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";

export default function BookingCRUD() {

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [driver, setDriver] = useState("");
    const [rider, setRider] = useState("");
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [days, setDays] = useState<string[]>([]);
    const [fee, setFee] = useState(Number);
    const [time, setTime] = useState("");

    const handleClick = () => {
        let booking = {
            driver: driver,
            pickup: pickup,
            destination: destination,
            days: days,
            fee: fee,
            time: time
        }
        postData(booking);
    }
    const postData = async (booking: { driver: string; pickup: string; destination: string; days: string[]; fee: number; time: string; }) => {
        const response = await fetch("http://127.0.0.1:3001/booking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rider)
        });
        const data = await response.json();
        console.log("Data From NEXT.js", rider);
        console.log("Data From Aventones API", data);
    }
    return (
        <>
            <Card>
                <CardBody>
                    <p>Aventons Details</p>
                </CardBody>
            </Card>
            <br />
            <div className={styles.testCRUD}>
                <Input color="secondary" type="text" variant="bordered" label="Driver" isRequired onChange={(e) => setDriver(e.target.value)} />
                <Input color="secondary" type="text" variant="bordered" label="Rider" isRequired onChange={(e) => setRider(e.target.value)} />
                <Input color="secondary" type="text" variant="bordered" label="Pickup" isRequired onChange={(e) => setPickup(e.target.value)} />
                <Input color="secondary" type="text" variant="bordered" label="Destination" isRequired onChange={(e) => setDestination(e.target.value)} />
                <Input color="secondary" type="Number" variant="bordered" label="Fee" isRequired onChange={(e) => setFee(Number(e.target.value))} />
                {/* <DatePicker color="secondary" showMonthAndYearPickers variant="bordered" label="Birth Date" calendarProps={{ onFocusChange: setDestination }} onChange={setDestination} /> */}
            </div>
            <>
                <br />
            </>
            <Button variant="ghost" color="secondary" onClick={handleClick}>Post Data</Button>
        </>
    );
}