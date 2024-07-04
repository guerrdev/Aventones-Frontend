'use client'
import React, { useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue } from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { useAuth } from "../AuthContext";
import { DeleteIcon } from "./DeleteIcon";
import styles from "./aventones.module.css";
import { VerticalDotsIcon } from "./VerticalDotsIcons";
import { EyeIcon } from "./EyeIcon";
import { columns, users } from "./data";
import { useRouter } from 'next/navigation'

const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

type User = typeof users[0];

export default function Aventones() {
    const { isLogged } = useAuth();
    const router = useRouter();
    const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof User];

        switch (columnKey) {
            case "driver":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatar }}
                        description={user.car}
                        name={cellValue}
                    >
                        {user.car}
                    </User>
                );
            case "from":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{user.to}</p>
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
                        <Tooltip color="warning" content="Edit this Aventon">
                            <span onClick={() => router.push('/booking/edit')} className="text-lg text-warning cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete this Aventon">
                            <span onClick={() => /*delete the aventon by ID*/ null} className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                // <span onClick={() => router.push('/booking/details')} className="text-lg text-default-400 cursor-pointer active:opacity-50">

                return cellValue;
        }
    }, [router]);

    useEffect(() => {
        if (!isLogged) {
            router.push('/');
        }
    }, []);


    return (
        <div className={styles.mainAventones}>
            <h1 className="text-2xl text-bold text-center">My Aventones</h1>
            <br />
            <div className="flex justify-end gap-2">
                <Button color="secondary" variant="ghost" onClick={() => router.push('/booking')}>
                    Book an Aventon
                </Button>
            </div>
            <br />
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={users}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
