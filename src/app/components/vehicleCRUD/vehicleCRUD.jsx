import React, { useState } from "react";
import styles from "./vehicleCRUD.module.css";
import { Button, Input, Card, CardBody } from "@nextui-org/react";

export default function VehicleCRUD() {
    const [model, setModel] = useState("");
    const [year, setYear] = useState(Number);
    const [plate, setPlate] = useState("");
    const [make, setMake] = useState("");
    const [seats, setSeats] = useState(Number);

    const handleClick = () => {
        let vehicle = {
            model: model,
            year: year,
            plate: plate,
            make: make,
            seats: seats
        };
        postData(vehicle);
    };

    const postData = async (vehicle) => {
        const response = await fetch("http://127.0.0.1:3001/vehicles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vehicle)
        });
        const data = await response.json();
        console.log("Data From NEXT.js", vehicle);
        console.log("Data From Aventones API", data);
    };

    return (
        <>
            <Card>
                <CardBody>
                    <p>Vehicle Details</p>
                </CardBody>
            </Card>
            <br />
            <div className={styles.testCRUD}>
                <Input color="secondary" type="text" variant="bordered" label="Model" isRequired onChange={(e) => setModel(e.target.value)} />
                <Input color="secondary" type="number" variant="bordered" label="Year" isRequired onChange={(e) => setYear(Number(e.target.value))} />
                <Input color="secondary" type="text" variant="bordered" label="Plate" isRequired onChange={(e) => setPlate(e.target.value)} />
                <Input color="secondary" type="text" variant="bordered" label="Make" isRequired onChange={(e) => setMake(e.target.value)} />
                <Input color="secondary" type="number" variant="bordered" label="Seats" isRequired onChange={(e) => setSeats(Number(e.target.value))} />
            </div>
            <br />
            <Button variant="ghost" color="secondary" onClick={handleClick}>Post Data</Button>
        </>
    );
}
