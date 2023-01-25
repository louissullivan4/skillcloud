import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const MsgInvite = () => {
    const location = useLocation()
    let navigate = useNavigate(); 

    const { from } = location.state
    let projectLink = "/project/" + from.project_id

    let userProfile = "/profile/" + from.project_author
    
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
            <div className="msg-page">
                <div className="msg-page-content">
                    <div className='msg-container'>
                        <div className='msg-status'>Invite current status: {from.status}</div>
                        <div className='msg-header'>You have been invited to a project !</div>
                        <div className="msg-body">This project was created on {from.date_created} by 
                        <Link to={projectLink}>{from.project_author}</Link>.
                        For more information, please click the project id below to view the project.
                        <Link to={userProfile}> Project Id: {from.project_id + ". "}</Link>
                        On completion of research, please accept or decline the invite.
                        </div>
                    </div>
                        <button type="button" onClick={AcceptInvite}>
                            Accept
                        </button>
                        <button type="button" onClick={DeclineInvite}>
                            Decline
                        </button>
                </div>
            </div>
        </div>
    );
}
export default MsgInvite;