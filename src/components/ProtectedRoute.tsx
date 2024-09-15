// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the import path

export const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

