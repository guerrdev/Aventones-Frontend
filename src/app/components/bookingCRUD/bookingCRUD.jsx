
import React from "react";
import { useState } from "react";
import styles from "./bookingCRUD.module.css";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { EyeFilledIcon } from "../PasswordEye/EyeFilledIcon.jsx"
import { EyeSlashFilledIcon } from "../PasswordEye/EyeSlashFilledIcon.jsx"
import { DatePicker } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";

export default function RiderCRUD() {
    let formatter = useDateFormatter({ dateStyle: "short" });
    let defaultDate = today(getLocalTimeZone());
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [driver, setDriver] = useState("");
    const [rider, setRider] = useState("");
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [days, setDays] = useState([]);
    const [fee, setFee] = useState(Number);
    const [time, setTime] = useState("");

    const handleClick = () => {
        let ndob = formatter.format(destination.toDate(getLocalTimeZone()));
        let rider = {
            first_name: driver,
            last_name: rider,
            cedula: pickup,
            dob: ndob,
            email: email,
            phone: phone,
            password: password
        }
        postData(rider);
    }
    const postData = async (rider) => {
        const response = await fetch("http://127.0.0.1:3001/riders", {
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
                    <p>Aventon's Details</p>
                </CardBody>
            </Card>
            <br />
            <div className={styles.testCRUD}>
                <Input color="secondary" type="text" variant="bordered" label="Driver" isRequired onChange={(e) => setDriver(e.target.value)} />
                <Input color="secondary" type="text" variant="bordered" label="Rider" isRequired onChange={(e) => setRider(e.target.value)} />
                <Input color="secondary" type="text" variant="bordered" label="Pickup" isRequired onChange={(e) => setPickup(e.target.value)} />
                <Input color="secondary" type="text" variant="bordered" label="Destination" isRequired onChange={(e) => setDestination(e.target.value)} />
                <Input color="secondary" type="Number" variant="bordered" label="Fee" isRequired onChange={(e) => setFee(e.target.value)} />
                {/* <DatePicker color="secondary" showMonthAndYearPickers variant="bordered" label="Birth Date" calendarProps={{ onFocusChange: setDestination }} onChange={setDestination} /> */}
                <Input color="secondary" type="email" variant="bordered" label="Email" isRequired onChange={(e) => setEmail(e.target.value)} />
                <Input color="secondary" type="number" variant="bordered" label="Phone Number" isRequired onChange={(e) => setPhone(e.target.value)} />
            </div>
            <>
                <Card>
                    <CardBody>
                        <p>Car Details</p>
                    </CardBody>
                </Card>
                <br />
            </>
            <div className={styles.testCRUD}>
                <Input color="secondary" type="text" variant="bordered" label="Make" isRequired onChange={(e) => setMake(e.target.value)} />
                <Input color="secondary" type="text" variant="bordered" label="Model" isRequired onChange={(e) => setModel(e.target.value)} />
                <Input color="secondary" type="number" variant="bordered" label="Year" isRequired onChange={(e) => setYear(e.target.value)} />
                <Input color="secondary" type="text" variant="bordered" label="Plate" isRequired onChange={(e) => setPlate(e.target.value)} />
            </div>
            <div className={styles.testPassword}>
                <Input label="Password" variant="bordered" endContent={
                    <button id={styles.eyeButton} className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs"
                    isRequired
                    onChange={(e) => setPassword(e.target.value)}
                    color="secondary"
                />
            </div>
            <br />
            <Button variant="ghost" color="secondary" onClick={handleClick}>Post Data</Button>
        </>
    );
}
// days : { type: Array },
// fee : { type: Number },
// time : { type: String }