import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const MsgInvite = () => {
    // let email = localStorage.user

    const location = useLocation()
    let navigate = useNavigate(); 

    const { from } = location.state
    let projectLink = "/project/" + from.project_id
    
    const AcceptInvite = async () => {
        const resp = await fetch('http://127.0.0.1:5000/invitationresponse/'+from.user_notified+"/"+from.role_id+"/accepted")
        const data = await resp.status;
        navigate("/completerequest" , { state: { from: data } });
    };

    const DeclineInvite = async () => {
        const resp = await fetch('http://127.0.0.1:5000/invitationresponse/'+from.user_notified+"/"+from.role_id+"/declined")
        const data = await resp.status;
        navigate("/completerequest" , { state: { from: data } });
    };

    return (
        <div className="app">
            <Sidebar/>
            <div className="page">
                <div className="page-content">
                    <div className='container-1'>
                        <div className='status'>Invite current status: {from.status}</div>
                        <div className='header'>You have been invited to a project !</div>
                        <div className="body">This project was created on {from.date_created} by {from.project_author}.
                        For more information, please click the project id below to view the project.
                        <Link to={projectLink}> Project Id: {from.project_id}</Link>
                        On completion of research, please accept or decline the invite.
                        </div>
                    </div>
                    <div className='container-2'>
                        <div className='row'>
                            <div className='col-1'>
                                <button type="button" className="but-pos" onClick={AcceptInvite}>
                                    Accept
                                </button>
                            </div>
                            <div className='col-2'>
                                <button type="button" className="but-neg" onClick={DeclineInvite}>
                                    Decline
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MsgInvite;