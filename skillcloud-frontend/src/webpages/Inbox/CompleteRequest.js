import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const CompleteRequest = () => {
    // let email = localStorage.user;
    const location = useLocation()
    const { from } = location.state

    let email = "louis@gmail.com"
    let header = ""
    let body = ""
    if (from.response_type === "success")  {
        header = "Success"
        body = "Your response has been recorded"
    } else if (from.response_type === "failure") {
        header = "Failure"
        body = "Your response has NOT been recorded. Please try again."
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
                        <div className="footer">
                            <Link to="/inbox">Back to Inbox</Link>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );
}
export default CompleteRequest;