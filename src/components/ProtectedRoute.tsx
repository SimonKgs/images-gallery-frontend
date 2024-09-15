// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Adjust the import path

export const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, loading } = useAuth();

    console.log("IS AUTH", isAuthenticated);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

