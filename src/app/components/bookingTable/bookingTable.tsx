'use client'
import { useRouter } from 'next/navigation';
import styles from "./bookingTable.module.css";
import React, { useEffect, useState } from "react";
import { EyeIcon } from "../../components/icons/EyeIcon";
import aventonesFetcher from "../utils/aventonesFetcher";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, User, Spinner } from "@nextui-org/react";

interface Booking {
    id: string;
    driver: string;
    from: string;
    to: string;
    seats: number;
    fee: string;
    avatar: string;
    car: string;
}

export default function BookingTable() {

    const [bookings, setBookings] = useState<Booking[]>([]);
    const router = useRouter();
    const loadingState = bookings.length === 0 ? "loading" : "idle";

    useEffect(() => {
        if (typeof window !== 'undefined') {
            aventonesFetcher().then((result) => {
                setBookings(result);
            });
        }
    }, []);

    const columns = [
        { name: "DRIVER", uid: "driver" },
        { name: "TRAVEL", uid: "from" },
        { name: "SEATS", uid: "seats" },
        { name: "FEE", uid: "fee" },
        { name: "ACTIONS", uid: "actions" },
    ];

    const renderCell = React.useCallback((booking: Booking, columnKey: React.Key) => {
        const cellValue = booking[columnKey as keyof Booking];
        switch (columnKey) {
            case "driver":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: booking.avatar }}
                        description={booking.car}
                        name={cellValue}
                    >
                        {booking.car}
                    </User>
                );
            case "from":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{booking.to}</p>
                    </div>
                );
            case "seats":
                return (
                    <div className="flex flex-col justify-center">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "fee":
                return (
                    <div className="flex flex-col justify-center">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex justify-center items-center gap-1">
                        <Tooltip color="secondary" content="View Details about this Aventon">
                            <span onClick={() => {
                                router.push('/booking/details')
                                localStorage.setItem('bookingId', booking.id);
                            }} className="text-lg text-secondary cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [router]);

    return (
        <div className={styles.mainTable}>
            <h1 className="text-2xl text-bold text-center">Aventones Available</h1>
            <br />
            <Table aria-label="Table with Aventones Available to you" >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={bookings} loadingContent={<Spinner label="Loading..." color="secondary" />} loadingState={loadingState}
                >
                    {(booking) => (
                        <TableRow key={booking.id}>
                            {(columnKey) => <TableCell>{renderCell(booking, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
