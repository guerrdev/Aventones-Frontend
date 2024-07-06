'use client'
import { useAuth } from "../../AuthContext";
import React, { useEffect, useState } from "react";
import styles from "./details.module.css";
import { useRouter } from 'next/navigation'
import { parseTime } from "@internationalized/date";
import { ClockCircleLinearIcon } from '../../components/icons/ClockCircleLinearIcon';
import { Card, CardBody, Input, CheckboxGroup, Checkbox, Spinner, TimeInput, Image, TimeInputValue } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { toast, ToastContainer } from "react-toastify";

export default function BookingDetailsPage() {

    const router = useRouter()
    const { tokenExists } = useAuth();
    const { theme } = useTheme()
    const [time, setTime] = React.useState<TimeInputValue>();
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [selected, setSelected] = React.useState([]);
    const [days, setDays] = React.useState([]);
    const [fee, setFee] = useState(Number);
    const [seats, setSeats] = useState(Number);
    const getToken = () => {
        const tokenRow = document.cookie.split(';').find((row) => row.trim().startsWith('token='));
        if (tokenRow) {
            return tokenRow.split('=')[1];
        }
        return null;
    }

    useEffect(() => {
        const bookingId = localStorage.getItem('bookingId');
        const fetchUserData = async () => {
            try {
                const token = getToken();
                const response = await fetch(`http://127.0.0.1:3001/booking/?id=${bookingId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setDestination(data.destination);
                    setTime(parseTime(data.time));
                    setDays(data.days);
                    setSeats(data.seatsAvailable);
                    setFee(data.fee);
                    setPickup(data.pickup);
                } else {
                    console.error('Failed to fetch user data');
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error:', error);
                router.push('/login');
            }
        };

        if (tokenExists) {
            fetchUserData();
        } else {
            router.push('/login');
        }
    }, [tokenExists, router]);

    if (!time) return <div className={styles.bookingMain}> <Spinner label="Loading..." color="secondary" /></div>;
    return (
        <div className={styles.bookingMain}>
            {theme === "dark" ? (<Image
                isBlurred
                src="/sedanlight.png"
                alt="User Icon"
                disableSkeleton={true}
            />) : (<Image
                isBlurred
                src="/sedandark.png"
                alt="Car Icon"
                disableSkeleton={true}
            />)}
            <h1 className={styles.h1Title}>This are the details of this Aventon!</h1>
            <br />
            <Card>
                <CardBody>
                    <p>Aventons Details</p>
                </CardBody>
            </Card>
            <br />
            <div className={styles.bookingCRUD}>
                <Input color="secondary" type="text" value={pickup} variant="bordered" label="Departure From" isReadOnly />
                <Input color="secondary" type="text" value={destination} variant="bordered" label="Arrive To" isRequired isReadOnly />
                <Input color="secondary" type="Number" value={fee.toString()} variant="bordered" label="Fee" isRequired startContent={
                    <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                    </div>
                } isReadOnly />
                <TimeInput color="secondary" value={time} isReadOnly hourCycle={24} variant="bordered" isRequired label="Time" startContent={(
                    <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                )} />
            </div>
            <>
                <Input className="max-w-xs" color="secondary" type="Number" value={seats.toString()} variant="bordered" label="Available Seats" isRequired startContent={
                    <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">#</span>
                    </div>
                } isReadOnly /></>
            <>
                <br />
                <CheckboxGroup
                    isRequired
                    label="When will this Aventon be available?"
                    orientation="horizontal"
                    description="Days that this Aventon is available."
                    color="secondary"
                    value={days}
                    isReadOnly
                >
                    <Checkbox value="Monday">Monday</Checkbox>
                    <Checkbox value="Tuesday">Tuesday</Checkbox>
                    <Checkbox value="Wednesday">Wednesday</Checkbox>
                    <Checkbox value="Thursday">Thursday</Checkbox>
                    <Checkbox value="Friday">Friday</Checkbox>
                    <Checkbox value="Saturday">Saturday</Checkbox>
                    <Checkbox value="Sunday">Sunday</Checkbox>
                </CheckboxGroup>
                <br />
            </>
            <ToastContainer />
        </div>
    );
}