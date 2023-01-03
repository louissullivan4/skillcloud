import React from 'react';
import { Link, useNavigate } from "react-router-dom";

import { UserAuth } from '../context/AuthContext';

import { BiHomeAlt, BiUser, BiBox, BiDoorOpen } from "react-icons/bi";

const Sidebar = () => {
    const { logout } = UserAuth()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (e) {
            console.log(e.message)
        }
    }
   return(
        <div className="sidebar">
            <ul>
                <li><Link to="/home"><BiHomeAlt style={{fontSize: '30px'}}/></Link></li>
                <li><Link to="/profile"><BiUser style={{fontSize: '30px'}}/></Link></li>
                <li><Link to="/inbox"><BiBox style={{fontSize: '30px'}}/></Link></li>
                <li><button onClick={handleLogout}><BiDoorOpen style={{fontSize: '30px'}}/></button></li>
            </ul>
        </div>
   )
}
export default Sidebar
