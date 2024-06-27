
import React from "react";
import { useState } from "react";
import styles from "./riderCRUD.module.css";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { EyeFilledIcon } from "../PasswordEye/EyeFilledIcon"
import { EyeSlashFilledIcon } from "../PasswordEye/EyeSlashFilledIcon"
import { DatePicker } from "@nextui-org/react";

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
    const [phone, setPhone] = useState<number>(0);
    const [password, setPassword] = useState("");

    const toastNOK = () =>
        toast('Not Authorized, please log In', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'error',
            theme: 'dark',
            position: 'top-left'
        });
    const toastOK = () =>
        toast('Rider Created!', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'success',
            theme: 'dark',
            position: 'top-left'
        });

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
    const postData = async (rider: { first_name: string; last_name: string; cedula: string; dob: string; email: string; phone: number; password: string; }) => {
        const token = sessionStorage.getItem('token');
        const response = await fetch("http://127.0.0.1:3001/riders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(rider)
        });
        const data = await response.json();
        if (response && response.status == 201) {
            console.log('Rider Created', data);
            toastOK();
        } else {
            toastNOK();
        }
    }
    return (
        <>
            <div className={styles.testCRUD}>
                <Input type="text" color="secondary" variant="bordered" label="First Name" isRequired onChange={(e) => setfName(e.target.value)} />
                <Input type="text" color="secondary" variant="bordered" label="Last Name" isRequired onChange={(e) => setlName(e.target.value)} />
                <Input type="text" color="secondary" variant="bordered" label="Cédula" isRequired onChange={(e) => setCedula(e.target.value)} />
                <DatePicker color="secondary" showMonthAndYearPickers variant="bordered" label="Birth Date" calendarProps={{ onFocusChange: setDob }} onChange={(value) => setDob(value as CalendarDate)} />
                <Input color="secondary" type="email" variant="bordered" label="Email" isRequired onChange={(e) => setEmail(e.target.value)} />
                <Input color="secondary" type="number" variant="bordered" label="Phone Number" isRequired onChange={(e) => setPhone(Number(e.target.value))} />
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
            <ToastContainer />
            <Button variant="ghost" color="secondary" onClick={handleClick}>Post Data</Button>
        </>
    );
}
