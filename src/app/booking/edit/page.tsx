'use client'
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import styles from "./login.module.css";
// import { useAuth } from "../AuthContext";
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify';
import React, { useEffect, useState } from "react";
// import { EyeFilledIcon } from "../components/PasswordEye/EyeFilledIcon"
import { Button, Input, Image, RadioGroup, Radio } from "@nextui-org/react";
// import { EyeSlashFilledIcon } from "../components/PasswordEye/EyeSlashFilledIcon"

export default function LoginPage() {

    const [selected, setSelected] = React.useState("rider");
    // const { isLogged, setIsLogged } = useAuth();
    const router = useRouter()
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [uemail, setUemail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = () => {
        let user = {
            email: uemail,
            password: password,
            type: selected
        }
        postSession(user);
    }

    const toastNOK = () =>
        toast('Check Email or Password', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'error',
            theme: 'dark',
            position: 'top-left',
        });

    const postSession = async (user: { email: string; password: string; type: string; }) => {
        const response = await fetch("http://10.0.0.2:3001/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if (response && response.status == 201) {
            const data = await response.json();
            const decodedToken: { email: string } = jwtDecode(data.token);
            const userEmail = decodedToken.email;
            // setIsLogged(true);
            document.cookie = `isLogged=${true}; max-age=86400; path=/`;
            document.cookie = `token=${data.token}; max-age=86400; path=/`;
            document.cookie = `authEmail=${userEmail}; max-age=86400; path=/`;
        } else {
            toastNOK();
        }
    }
    // useEffect(() => {
    //     if (isLogged) {
    //         router.push('/');
    //     }
    // }, [isLogged, router]);

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
                <h1 className={styles.h1Title}>Login In into Aventones</h1>
                <RadioGroup
                    label="Are you a Rider or a Driver?"
                    orientation="horizontal"
                    value={selected}
                    onValueChange={setSelected}
                    color="secondary"
                >
                    <Radio value="riderauth">Rider</Radio>
                    <Radio value="driverauth">Driver</Radio>
                </RadioGroup>
                <br />
                <Input className="max-w-xs" type="text" color="secondary" variant="bordered" label="Email" isRequired onChange={(e) => setUemail(e.target.value)} />
                <br />
                {/* <Input label="Password" variant="bordered" endContent={
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
                /> */}
                <br />
                <ToastContainer />
                <Button size="lg" variant="ghost" color="secondary" onPress={handleClick}>Login</Button>
            </div>
            <ToastContainer />
        </>
    );
}
