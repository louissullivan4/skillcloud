import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'

import { UserAuth } from '../../context/AuthContext';

import "../../index.css";

{/* The following code is an adaptation of the code created by
Briley,C (2022) firebase-auth-context[Source Code]. https://github.com/fireclint/firebase-auth-context */}

const Logout = () => {
    const { logout } = UserAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const handleLogout = async () => {
            await logout();
            navigate('/');
        };
        handleLogout()
    }, []);

    return (
        <div className="app">
        </div>
    );
}
export default Logout;