import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const MsgApplyResponse = () => {
    const location = useLocation()
    const { from } = location.state
     
    let projectLink = "/project/" + from.project_id
    let userProfile = "/profile/" + from.project_author
    let role_id = from.role_id
    const [role, setRole] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch('http://scbackend-env.eba-93hey2mi.eu-north-1.elasticbeanstalk.com/getrole/' + role_id)
            const data = await resp.json();
            setRole(data[2]);
        }; 
        fetchData();
    }, [role_id]);


    return (
        <div className="app">
            <Sidebar/>
            <div className="msg-page">
                <div className="msg-page-content">
                    <div className='msg-container'>
                        <div className='msg-header'>{from.status === "accepted" ? "Accepted!" : from.status === "declined" ? "Declined" : "Error"}</div>
                        <div className="msg-body">
                            <div className="msg-para1">
                                Your request to join project id <Link to={projectLink}>{from.project_id}</Link> as a {role} has
                                been {from.status} by <Link to={userProfile}>{from.project_author}</Link>.
                                {from.status === "accepted" ? <div>Message them to get started!</div> : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MsgApplyResponse;