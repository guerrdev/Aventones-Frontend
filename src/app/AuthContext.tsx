'use client'
import { set } from 'lodash';
import React, { createContext, useState, useContext, ReactNode, FunctionComponent, useEffect } from 'react';

interface AuthContextType {
    isLogged: boolean;
    email: string;
    setIsLogged: (isLogged: boolean) => void;
    setEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Function to parse cookies
const getCookies = (): { [key: string]: string } => {
    return document.cookie.split('; ').reduce((acc, current) => {
        const [name, value] = current.split('=');
        acc[name] = value;
        return acc;
    }, {} as { [key: string]: string });
};

export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const cookies = getCookies();
        // Assuming you have a cookie named 'authEmail' for the user's email
        if (cookies.authEmail) {
            setEmail(cookies.authEmail);
            setIsLogged(true);
        }
        else {
            setIsLogged(false);
            setEmail('');
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLogged, email, setIsLogged, setEmail }}>
            {children}
        </AuthContext.Provider>
    );
};