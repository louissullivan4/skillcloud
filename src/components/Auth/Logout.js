import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'

import { UserAuth } from '../../context/AuthContext';

import "../../index.css";

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