'use client'
import { toast } from 'react-toastify';
import { useAuth } from "../AuthContext";
import React, { useEffect } from "react";
import styles from "./settings.module.css";
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

export default function RiderCRUD() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isLogged, setIsLogged } = useAuth();
    const router = useRouter();

    const toastOK = () =>
        toast('You are already logged In', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'info',
            theme: 'dark',
            position: 'top-left'
        });

    const toastNOK = () =>
        toast('Check Login and Password', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'error',
            theme: 'dark',
            position: 'top-left',
        });

    useEffect(() => {
        if (!isLogged) {
            router.push('/login');
        }
    }, [isLogged, router]);

    return (
        <>
            <div className={styles.settingsMain}>
                <Button size="lg" variant="ghost" color="warning" onPress={onOpen}>Delete Account</Button>
                <Modal isOpen={isOpen} backdrop='blur' placement='center' onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Warning</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Are you sure you want to delete your account?
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" variant="ghost" onPress={onClose}>
                                        No
                                    </Button>
                                    <Button color="danger" variant="ghost" onPress={() => { onClose()/*something to delete its own account*/ }}>
                                        Yes
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
            <ToastContainer />
        </>
    );
}
