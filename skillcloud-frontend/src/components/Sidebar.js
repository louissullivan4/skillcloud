import React from 'react';
import { BiHomeAlt, BiUser, BiBox } from "react-icons/bi";
import { BsInbox } from "react-icons/bs";

function Sidebar() {
   return(
        <div className="sidebar">
            <ul>
                <li><a id="home" href="/"><BiHomeAlt style={{fontSize: '30px'}}/></a></li>
                <li><a id="profile" href="/profile"><BiUser style={{fontSize: '30px'}}/></a></li>
                <li><a id="inbox" href="/inbox"><BiBox style={{fontSize: '30px'}}/></a></li>
            </ul>
        </div>
   )
}

export default Sidebar
