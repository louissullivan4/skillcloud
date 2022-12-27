import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const MsgResponse = () => {
    // let email = localStorage.user;
    const location = useLocation()
    const { from } = location.state
    let email = "louis@gmail.com"
    let projectLink = "/project/" + from.project_id

    return (
        <div className="app">
            <Sidebar/>
            <div className="page">
                <div className="page-content">
                    <div className='container'>
                        <div className='header'>{from.status === "accepted" ? "Accepted!" : from.status === "declined" ? "Declined" : "Error"}</div>
                        <div className="body">The request for project id <Link to={projectLink}>{from.project_id}</Link> has been {from.status} by {from.user_notified}.</div>
                    </div> 
                </div>
            </div>
        </div>
    );
}
export default MsgResponse;