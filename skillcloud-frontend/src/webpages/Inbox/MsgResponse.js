import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const MsgResponse = () => {
    // let email = localStorage.user;
    const location = useLocation()
    const { from } = location.state
    let email = "louis@gmail.com"
    let header = ""
    let body = ""

    if (from.status === "accepted")  {
        header = "accepted"
        body = "The request has been accepted by the user " + from.user.toString() + "."
    } else if (from.status === "declined") {    
        header = "declined"
        body = "The request has been declined by the user " + from.user.toString() + "."
    } else {
        header = "Error"
        body = "An error has occured."
    }

    return (
        <div className="app">
            <Sidebar/>
            <div className="page">
                <div className="page-content">
                    <div className='container'>
                        <div className='header'>{header}</div>
                        <div className="body">{body}</div>
                    </div> 
                </div>
            </div>
        </div>
    );
}
export default MsgResponse;