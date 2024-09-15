import { useState, useEffect } from 'react';

const authUrl = 'http://localhost:5000/user'

// THIS hook will check if the user is authenticated correctly after check the current user with the backend
export const useAuth = () => {
    
    const [authState, setAuthState] = useState<{ isAuthenticated: boolean, user?: any, loading: boolean }>({ isAuthenticated: false, loading: true });

    useEffect(() => {
        const checkAuth = async () => {
            // console.log("AUTHENTICATING...");

            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('id');

            if (!token || !userId) {
                setAuthState({ isAuthenticated: false, loading: false });
                return;
            }

            try {
                const response = await fetch(`${authUrl}/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // console.log("RESPONSE", { response });

                if (response.ok) {
                    const data = await response.json();
                    // console.log("RESPONSE OK");

                    if (data.ok) {
                        // console.log("DATA OK");
                        setAuthState({ isAuthenticated: true, user: data, loading: false });
                    } else {
                        // console.log("DATA FALSE");
                        setAuthState({ isAuthenticated: false, loading: false });
                    }
                } else {
                    // console.log("RESPONSE FALSE");
                    setAuthState({ isAuthenticated: false, loading: false });
                }
            } catch {
                setAuthState({ isAuthenticated: false, loading: false });
            }
        };

        checkAuth();
    }, []);

    // console.log("AUTH STATE", authState);

    return authState;
};