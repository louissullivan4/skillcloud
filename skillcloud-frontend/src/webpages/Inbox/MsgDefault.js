import React, { useEffect, useState } from 'react'

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const MsgDefault = () => {
    // let email = localStorage.user;
    let email = "louis@gmail.com"

    return (
        <div className="app">
            <Sidebar/>
            <div className="page">
                <div className="page-content">
                    <div className='container'>
                        <div className='header'>Error occurred</div>
                        <div className="body">Oops</div>
                    </div> 
                </div>
            </div>
        </div>
    );
}
export default MsgDefault;