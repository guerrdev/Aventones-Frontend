'use client'

import { jwtDecode } from "jwt-decode";

const aventonesFetcher = async () => {

    const bookings: { id: any; driver: string; from: any; to: any; seats: number; fee: string; avatar: any; car: string; }[] = [];
    let response;
    const getToken = () => {
        const tokenRow = document.cookie.split(';').find((row) => row.trim().startsWith('token='));
        if (tokenRow) {
            return tokenRow.split('=')[1];
        }
        return null;
    }

    let token = getToken();
    let decodedToken: { userId: string; role: string; } | undefined;
    try {
        decodedToken = jwtDecode(token as string);
    } catch (error) {
        console.log('Not token found!');
    }

    if (token && decodedToken && decodedToken.role === 'driver') {
        response = await fetch(`http://127.0.0.1:3001/booking/?driver=${decodedToken.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else {

        response = await fetch(`http://127.0.0.1:3001/booking/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    if (response !== undefined && response.ok) {
        const data = await response.json();
        for (const booking of data) {
            let DBbooking = {
                id: booking._id,
                driver: `${booking.driver.first_name + " " + booking.driver.last_name}`,
                from: booking.pickup,
                to: booking.destination,
                seats: Number(booking.seatsAvailable),
                fee: `${'$' + booking.fee}`,
                avatar: booking.driver.profilePicture,
                car: `${booking.driver.make + " " + booking.driver.model + " " + booking.driver.year}`
            }
            bookings.push(DBbooking);
        }
    } else {
        console.error('An unexpected error happened:', response?.statusText);
    }
    return bookings;
};

export default aventonesFetcher;