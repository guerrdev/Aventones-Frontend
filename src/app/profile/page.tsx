'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../AuthContext';
import styles from './profile.module.css';

const ProfilePage: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const { isLogged } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
                if (!tokenCookie) {
                    console.error('Token not found');
                    router.push('/login');
                    return;
                }

                const token = tokenCookie.split('=')[1];
                const response = await fetch('http://127.0.0.1:3001/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error('Failed to fetch user data');
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error:', error);
                router.push('/login');
            }
        };

        if (isLogged) {
            fetchUserData();
        } else {
            router.push('/login');
        }
    }, [isLogged, router]);

    if (!userData) return <div>Loading...</div>;

    return (
        <div className={styles.profileContainer}>
            <h1>User Profile</h1>
            <div className={styles.profileInfo}>
                <p><strong>First Name:</strong> {userData.first_name}</p>
                <p><strong>Last Name:</strong> {userData.last_name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone:</strong> {userData.phone}</p>
                <p><strong>Role:</strong> {userData.role}</p>
                {/* Add more fields as needed */}
            </div>
        </div>
    );
};

export default ProfilePage;
