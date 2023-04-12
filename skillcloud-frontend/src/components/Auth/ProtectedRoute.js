import React from 'react'
import { UserAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

{/* The following code was created by
Briley,C (2022) firebase-auth-context[Source Code]. https://github.com/fireclint/firebase-auth-context */}

const ProtectedRoute = ({ children }) => {
    const { user } = UserAuth();
    if (!user) {
        return <Navigate to='/' />
    }
    return children;
}

export default ProtectedRoute;