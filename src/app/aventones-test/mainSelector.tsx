"use client"
import styles from "./test.module.css";
import React from "react";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";
import RiderCRUD from "../components/riderCRUD/riderCRUD.jsx";

export default function BackendTest() {

    const crudList = [
        { key: "driver", label: "Driver" },
        { key: "rider", label: "Rider" },
        { key: "booking", label: "Booking" },
        { key: "vehicle", label: "Vehicle" }
    ];
    return (
        <div className={styles.testMain}>
            <h1 className={styles.h1Title}>Aventones Front/Back-end Test July 27th</h1>
            <Select
                label="CRUD"
                placeholder="Select a CRUD"
                className="max-w-xs"
                variant="bordered"
            >
                {crudList.map((crud) => (
                    <SelectItem key={crud.key}>
                        {crud.label}
                    </SelectItem>
                ))}
            </Select>
            <br />
                <RiderCRUD />
        </div>
    );
}
