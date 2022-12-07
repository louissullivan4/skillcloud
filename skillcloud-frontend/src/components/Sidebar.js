import React from 'react';
import { BiHomeAlt, BiUser, BiBox, BiDoorOpen, BiAbacus } from "react-icons/bi";
import { Link } from "react-router-dom";

const Sidebar = () => {
   return(
        <div className="sidebar">
            <ul>
                <li><Link to="/"><BiHomeAlt style={{fontSize: '30px'}}/></Link></li>
                <li><Link to="/profile"><BiUser style={{fontSize: '30px'}}/></Link></li>
                <li><Link to="/inbox"><BiBox style={{fontSize: '30px'}}/></Link></li>
                <li><Link to="/logout"><BiDoorOpen style={{fontSize: '30px'}}/></Link></li>
                <li><Link to="/test"><BiAbacus style={{fontSize: '30px'}}/></Link></li>
            </ul>
        </div>
   )
}
export default Sidebar
