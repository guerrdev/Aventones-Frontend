'use client'
import { useRouter } from 'next/navigation';
import styles from "./requestTable.module.css";
import React, { useEffect, useState } from "react";
import { EyeIcon } from "../icons/EyeIcon";
import requestFetcher from "../utils/requestFetcher";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Spinner } from "@nextui-org/react";

interface Request {
    id: string;
    from: string;
    to: string;
    days: Array<string>;
    time: string;
}

export default function RequestTable() {

    const [requests, setRequests] = useState<Request[]>([]);
    const router = useRouter();
    const loadingState = requests.length === 0 ? "loading" : "idle";

    useEffect(() => {
        if (typeof window !== 'undefined') {
            requestFetcher().then((result) => {
                setRequests(result);
            });
        }
    }, []);

    const columns = [
        { name: "TRAVEL", uid: "from" },
        { name: "DAYS", uid: "days" },
        { name: "TIME", uid: "time" },
        { name: "ACTIONS", uid: "actions" }
    ];

    const renderCell = React.useCallback((request: Request, columnKey: React.Key) => {
        const cellValue = request[columnKey as keyof Request];
        switch (columnKey) {
            case "from":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{request.to}</p>
                    </div>
                );
            case "days":
                return (
                    <div className="flex flex-col justify-center">
                        {(cellValue as string[]).map((day: string) => (
                            <p key={day} className="text-bold text-sm capitalize">{day}</p>
                        ))}
                    </div>
                );
            case "time":
                return (
                    <div className="flex flex-col justify-center">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex justify-center items-center gap-1">
                        <Tooltip color="secondary" content="View Details about this Request">
                            <span onClick={() => {
                                router.push('/booking')
                                localStorage.setItem('requestId', request.id);
                                localStorage.setItem('action', 'request');
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
            <h1 className="text-2xl text-bold text-center">Requests Available</h1>
            <br />
            <Table aria-label="Table with Requests Available to you" >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={requests} loadingContent={<Spinner label="Loading..." color="secondary" />} loadingState={loadingState}
                >
                    {(request) => (
                        <TableRow key={request.id}>
                            {(columnKey) => <TableCell>{renderCell(request, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
