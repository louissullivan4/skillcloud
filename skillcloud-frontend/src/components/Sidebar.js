import React from 'react';
import { Link } from "react-router-dom";

import { BiHomeAlt, BiUser, BiBox, BiDoorOpen, BiChat } from "react-icons/bi";

const Sidebar = () => {
    const email = localStorage.getItem("email")
   return(
    <ul className='list-group'>
        <li><Link to="/home"><BiHomeAlt style={{fontSize: '2em'}}/></Link></li>
        <li><Link to={`/profile/${email}`}><BiUser style={{fontSize: '2em'}}/></Link></li>
        <li><Link to="/inbox"><BiBox style={{fontSize: '2em'}}/></Link></li>
        <li><Link to="/contacts"><BiChat style={{fontSize: '2em'}}/></Link></li>
        <li><Link to="/logout"><BiDoorOpen style={{fontSize: '2em'}}/></Link></li>
    </ul>
   )
}
export default Sidebar
