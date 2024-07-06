'use client'

const fetchAventones = async () => {
    const bookings: { id: any; driver: string; from: any; to: any; seats: number; fee: string; avatar: any; car: string; }[] = []; // Declare the 'bookings' variable

    const getToken = () => {
        const tokenRow = document.cookie.split(';').find((row) => row.trim().startsWith('token='));
        if (tokenRow) {
            return tokenRow.split('=')[1];
        }
        return null;
    }

        const token = getToken();
        const response = await fetch('http://127.0.0.1:3001/booking', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
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
            console.error('An unexpected error happened:', response.statusText);
        }
        return bookings;
    };

export default fetchAventones;