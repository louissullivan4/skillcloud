import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const MsgApply = () => {
    const location = useLocation()
    let navigate = useNavigate(); 

    const { from } = location.state
    console.log(from)
    let projectLink = "/project/" + from.project_id
    let userProfile = "/profile/" + from.user_notified
    let role_id = from.role_id
    const [role, setRole] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch('http://scbackend-env.eba-93hey2mi.eu-north-1.elasticbeanstalk.com/' + role_id)
            const data = await resp.json();
            setRole(data[2]);
        }; 
        fetchData();
    }, [role_id]);
    
    const AcceptApply= async () => {
        const resp = await fetch('http://scbackend-env.eba-93hey2mi.eu-north-1.elasticbeanstalk.com/'+from.project_author+"/"+from.user_notified+"/"+from.role_id+"/accepted")
        const data = await resp.status;
        navigate("/completerequest" , { state: { from: data } });
    };

    const DeclineApply = async () => {
        const resp = await fetch('http://scbackend-env.eba-93hey2mi.eu-north-1.elasticbeanstalk.com/'+from.project_author+"/"+from.user_notified+"/"+from.role_id+"/declined")
        const data = await resp.status;
        navigate("/completerequest" , { state: { from: data } });
    };

    return (
        <div className="app">
            <Sidebar/>
            <div className="msg-page">
                <div className="msg-page-content">
                    <div className='msg-container'>
                        <div className='msg-header'>Manual Project Application Received!</div>
                        <div className="msg-body">
                            The user <Link to={userProfile}>{from.user_notified}</Link> has sent an application to 
                            join your project <Link to={projectLink}> #{from.project_id}</Link> for the role titled {role}.
                            Please accept or decline the application.
                        </div>
                    </div>
                    <div className="msg-footer">
                        <button type="button" style={{"backgroundColor": "green"}} onClick={AcceptApply}>
                            Accept
                        </button>
                        <button type="button" style={{"marginLeft": "1em", "backgroundColor": "red"}} onClick={DeclineApply}>
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MsgApply;