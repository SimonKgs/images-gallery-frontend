import React, { createContext, useState, useEffect, ReactNode } from 'react';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { loginAction, RegisterAction } from '../services/auth.service';



// Define the type for authentication context value
interface AuthContextType {
    isAuthenticated: boolean;
    user?: any;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}


// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const MySwal = withReactContent(Swal);

// Define the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<{ isAuthenticated: boolean, user?: any, loading: boolean }>({
        isAuthenticated: false,
        user: undefined,
        loading: true
    });

    // Load token and user ID from localStorage and check authentication
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('id');

            if (!token || !userId) {
                setAuthState({ isAuthenticated: false, loading: false });
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/user/${userId}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    setAuthState({ isAuthenticated: data.ok, user: data, loading: false });
                } else {
                    MySwal.fire({
                        title: 'Authentication Failed',
                        text: 'An error occurred while authenticating the user. Please log in.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                    setAuthState({ isAuthenticated: false, loading: false });
                }
            } catch {
                setAuthState({ isAuthenticated: false, loading: false });
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const data = await loginAction({ email, password });
            
            setAuthState({ isAuthenticated: true, user: { id: data.id, username: data.username }, loading: false });
        } catch {
            MySwal.fire({
                title: 'Login Failed',
                text: 'An error occurred while logging in. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            setAuthState({ isAuthenticated: false, loading: false });
        }
    };

    const register = async (username: string, email: string, password: string) => {
        try {
            const data = await RegisterAction({ username, email, password });
            setAuthState({ isAuthenticated: true, user: { id: data.id, username: data.username }, loading: false });
        } catch {
            MySwal.fire({
                title: 'Registration Failed',
                text: 'An error occurred during registration. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            setAuthState({ isAuthenticated: false, loading: false });
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        setAuthState({ isAuthenticated: false, user: undefined, loading: false });
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};