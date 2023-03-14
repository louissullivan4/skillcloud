import React from 'react';
import { Link, useNavigate } from "react-router-dom";

import { BiHomeAlt, BiUser, BiBox, BiDoorOpen, BiChat } from "react-icons/bi";

const Sidebar = () => {
   const email = localStorage.getItem("email")
   const navigate = useNavigate()
   const logout = () => {
    if (window.confirm("Are you sure you want to logout?")){
            navigate("/logout")
        }
    }
   return(
    <ul className='list-group'>
        <li><Link to="/home"><BiHomeAlt style={{fontSize: '2em'}}/></Link></li>
        <li><Link to={`/profile/${email}`}><BiUser style={{fontSize: '2em'}}/></Link></li>
        <li><Link to="/inbox"><BiBox style={{fontSize: '2em'}}/></Link></li>
        <li><Link to="/contacts"><BiChat style={{fontSize: '2em'}}/></Link></li>
        <button onClick={logout}><BiDoorOpen style={{fontSize: '2em'}}/></button>
    </ul>
   )
}
export default Sidebar
