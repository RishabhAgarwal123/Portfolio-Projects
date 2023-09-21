// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {
    // const { isAuthenticated } = useContext(UserContext);

    return isAuthenticated ? (
        element
    ) : (
        <Navigate to="/login" replace />
    );
}

export default ProtectedRoute;
