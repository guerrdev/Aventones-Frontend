
import React, { SetStateAction } from "react";
import { useState } from "react";
import styles from "./driverCRUD.module.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { today, getLocalTimeZone, DateValue, CalendarDate } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { EyeFilledIcon } from "../PasswordEye/EyeFilledIcon"
import { EyeSlashFilledIcon } from "../PasswordEye/EyeSlashFilledIcon"
import { Card, CardBody, DatePicker, Input,Button } from "@nextui-org/react";

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
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [plate, setPlate] = useState("");
    const [make, setMake] = useState("");

    const handleClick = () => {
        let ndob = formatter.format(dob.toDate(getLocalTimeZone()));
        let driver = {
            first_name: fName,
            last_name: lName,
            cedula: cedula,
            dob: ndob,
            email: email,
            phone: phone,
            model: model,
            plate: plate,
            year: year,
            make: make,
            password: password
        }
        postData(driver);
    }

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

    const postData = async (driver: { first_name: string; last_name: string; cedula: string; dob: string; email: string; phone: number; model: string; plate: string; year: string; make: string; password: string; }) => {
        const token = sessionStorage.getItem('token');
        const response = await fetch("http://127.0.0.1:3001/drivers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(driver)
        });
        const data = await response.json();
        if (response && response.status == 201) {
            console.log('Driver Created', data);
            toastOK();
        } else {
            toastNOK();
        }
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
                <DatePicker color="secondary" showMonthAndYearPickers variant="bordered" label="Birth Date" calendarProps={{ onFocusChange: setDob }} onChange={(value: DateValue) => setDob(value as SetStateAction<CalendarDate>)} />
                <Input color="secondary" type="email" variant="bordered" label="Email" isRequired onChange={(e) => setEmail(e.target.value)} />
                <Input color="secondary" type="number" variant="bordered" label="Phone Number" isRequired onChange={(e) => setPhone(Number(e.target.value))} />
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
            <ToastContainer />
            <Button variant="ghost" color="secondary" onClick={handleClick}>Post Data</Button>
        </>
    );
}