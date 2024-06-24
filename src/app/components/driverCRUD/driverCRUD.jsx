
import React from "react";
import { useState } from "react";
import styles from "./driverCRUD.module.css";
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
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [cedula, setCedula] = useState("");
    const [dob, setDob] = useState(defaultDate);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(Number);
    const [password, setPassword] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [plate, setPlate] = useState("");
    const [make, setMake] = useState("");

    const handleClick = () => {
        let ndob = formatter.format(dob.toDate(getLocalTimeZone()));
        let rider = {
            first_name: fName,
            last_name: lName,
            cedula: cedula,
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
                    <p>Driver Details</p>
                </CardBody>
            </Card>
            <br />
            <div className={styles.testCRUD}>
                <Input color="secondary" type="text" variant="bordered" label="First Name" isRequired onChange={(e) => setfName(e.target.value)} />
                <Input color="secondary" type="text" variant="bordered" label="Last Name" isRequired onChange={(e) => setlName(e.target.value)} />
                <Input color="secondary" type="text" variant="bordered" label="Cédula" isRequired onChange={(e) => setCedula(e.target.value)} />
                <DatePicker color="secondary" showMonthAndYearPickers variant="bordered" label="Birth Date" calendarProps={{ onFocusChange: setDob }} onChange={setDob} />
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