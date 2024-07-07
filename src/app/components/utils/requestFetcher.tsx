'use client'

const aventonesFetcher = async () => {
    const requests: { id: string; from: string; to: string; days: string[], time: string }[] = []; // Declare the 'bookings' variable

    const getToken = () => {
        const tokenRow = document.cookie.split(';').find((row) => row.trim().startsWith('token='));
        if (tokenRow) {
            return tokenRow.split('=')[1];
        }
        return null;
    }

    const response = await fetch('http://127.0.0.1:3001/reqaventon', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    });
    if (response.ok) {
        const data = await response.json();
        for (const request of data) {
            let DBrequest = {
                id: request._id,
                from: request.pickup,
                to: request.destination,
                days: request.days,
                time: request.time,
            }
            requests.push(DBrequest);
        }
    } else {
        console.error('An unexpected error happened:', response.statusText);
    }
    return requests;
};

export default aventonesFetcher;