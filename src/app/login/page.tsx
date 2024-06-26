'use client'
import React from "react";
import { useState } from "react";
import styles from "./login.module.css";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import { EyeFilledIcon } from "../components/PasswordEye/EyeFilledIcon.jsx"
import { EyeSlashFilledIcon } from "../components/PasswordEye/EyeSlashFilledIcon.jsx"

export default function RiderCRUD() {

    const router = useRouter()
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = () => {
        let loginRider = {
            email: email,
            password: password
        }
        postSession(loginRider);
    }

    const postSession = async (loginRider: { email: string; password: string; }) => {
        const response = await fetch("http://127.0.0.1:3001/authentication", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginRider)
        });
        if (response && response.status == 201) {
            const token = await response.json();
            console.log('token saved', token);
            sessionStorage.setItem('token', token.session.token);
            alert(`Welcome ${token.session.user}`);
            //toast
            // router.push('/aventones-test')
        } else {
            alert("No silve eta vaina");
            //toast
        }
    }
    return (
        <>
            <div className={styles.loginMain}>
                <Image
                    isBlurred
                    width={240}
                    src="https://www.pngmart.com/files/22/Mercedes-Benz-G-Class-PNG-HD.png"
                    alt="G Wagon PNG Image"
                    className="m-8"
                />
                <h1 className={styles.h1Title}>Sign In into Aventones</h1>
                <br />
                <Input className="max-w-xs" type="text" color="secondary" variant="bordered" label="Email" isRequired onChange={(e) => setEmail(e.target.value)} />
                <br />
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
                <br />
                <Button variant="ghost" color="secondary" onClick={handleClick}>Login</Button>
            </div>
        </>
    );
}
