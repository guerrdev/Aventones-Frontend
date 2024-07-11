'use client'

import { jwtDecode } from "jwt-decode";

const aventonesFetcher = async () => {
    const requests: { id: string; rider: string; booking: string; }[] = [];

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
        response = await fetch(`http://127.0.0.1:3001/reqaventon/?driver=${decodedToken.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });
    } else {

        response = await fetch(`http://127.0.0.1:3001/reqaventon/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });
    }

    if (response !== undefined && response.ok) {
        const data = await response.json();
        for (const request of data) {
            let DBrequest = {
                id: request._id,
                rider: request.rider,
                booking: request.booking,
            }
            requests.push(DBrequest);
        }
    } else {
        console.error('An unexpected error happened:', response.statusText);
    }
    return requests;
};

export default aventonesFetcher;