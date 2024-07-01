'use client'
import styles from "./register.module.css";
import React, { useEffect } from "react";
import { Image, RadioGroup, Radio } from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import { useAuth } from "../AuthContext";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from 'react-toastify';
import RiderCRUD from "../components/riderCRUD/riderCRUD";
import DriverCRUD from "../components/driverCRUD/driverCRUD";

export default function RegisterPage() {
    const textD = "Register as Driver";
    const textR = "Register as Rider";

    const [selected, setSelected] = React.useState("rider");
    const { isLogged, setIsLogged } = useAuth();
    const router = useRouter()

    const switchCrud = () => {
        switch (selected) {
            case "driver":
                return <DriverCRUD TextProps={textD} />;
            case "rider":
                return <RiderCRUD TextProps={textR} />;
            default:
                return <div>
                    <RiderCRUD TextProps={textR} />
                </div>;
        }
    }

    useEffect(() => {
        if (isLogged) {
            router.push('/');
        }
    }, [isLogged, router]);

    return (
        <>
            <div className={styles.registerMain}>
                {selected === "rider" ? (<Image
                    isBlurred
                    src="/user-light64.png"
                    alt="Aventones' Car Logo"
                    disableSkeleton={true}
                />) : (<Image
                    isBlurred
                    src="/logo-aventones-light240.png"
                    alt="Aventones' Car Logo"
                    disableSkeleton={true}
                />)}
                <h1 className={styles.h1Title}>Sign Up into Aventones</h1>
                <br />
                <RadioGroup
                    label="Are you a Rider or a Driver?"
                    orientation="horizontal"
                    value={selected}
                    onValueChange={setSelected}
                    color="secondary"
                >
                    <Radio value="rider">Rider</Radio>
                    <Radio value="driver">Driver</Radio>
                </RadioGroup>
                <br />
                {switchCrud()}
            </div>
            <ToastContainer />
        </>
    );
}
