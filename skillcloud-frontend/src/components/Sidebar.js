import React from 'react';
import { BiHomeAlt, BiUser } from "react-icons/bi";

function Sidebar() {
   return(
        <div class="sidebar">
            <ul>
                <li><a id="home" href="/"><BiHomeAlt style={{fontSize: '30px'}}/></a></li>
                <li><a id="profile" href="/profile"><BiUser style={{fontSize: '30px'}}/></a></li>
            </ul>
        </div>
   )
}

export default Sidebar
