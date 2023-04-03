import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const MsgApplication = () => {
    const location = useLocation()
    let navigate = useNavigate(); 

    const { from } = location.state
    let projectLink = "/project/" + from.project_id

    let userProfile = "/profile/" + from.user_notified
    
    const AcceptInvite = async () => {
        const resp = await fetch('http://scbackend-env.eba-imjep3am.eu-north-1.elasticbeanstalk.com/applicationresponse/'+from.user_notified+"/"+from.role_id+"/accepted")
        const data = await resp.status;
        navigate("/completerequest" , { state: { from: data } });
    };

    const DeclineInvite = async () => {
        const resp = await fetch('http://scbackend-env.eba-imjep3am.eu-north-1.elasticbeanstalk.com/applicationresponse/'+from.user_notified+"/"+from.role_id+"/declined")
        const data = await resp.status;
        navigate("/completerequest" , { state: { from: data } });
    };

    return (
        <div className="app">
            <Sidebar/>
            <div className="msg-page">
                <div className="msg-page-content">
                    <div className='msg-container'>
                        <div className='msg-status'>Application current status: {from.status}</div>
                        <div className="msg-body">The user <Link to={userProfile}>{from.user_notified}</Link> has manually 
                        applied to your project, <Link to={projectLink}> Project Id: {from.project_id + ". "}</Link> for the 
                        role of {from.role_name}. Please accept or decline the application.
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
export default MsgApplication;