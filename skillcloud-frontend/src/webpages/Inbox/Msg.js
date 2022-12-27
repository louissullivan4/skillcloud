import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const Msg = () => {
    // let email = localStorage.user;
    const location = useLocation()
    const { from } = location.state
    let email = "louis@gmail.com"
    console.log(from)

    return (
        <div className="app">
            <Sidebar/>
            <div className="page">
                <div className="page-content">
                    <div className='container'>
                        <div className='header'>{from.title}</div>
                        <div className="body">{from.body}</div>
                    </div> 
                </div>
            </div>
        </div>
    );
}
export default Msg;