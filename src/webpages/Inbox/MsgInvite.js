import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const MsgInvite = () => {
    const location = useLocation()
    let navigate = useNavigate(); 

    const { from } = location.state
    console.log(from)
    let projectLink = "/project/" + from.project_id
    let userProfile = "/profile/" + from.project_author
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
    
    const AcceptInvite = async () => {
        const resp = await fetch('http://scbackend-env.eba-93hey2mi.eu-north-1.elasticbeanstalk.com/'+from.user_notified+"/"+from.role_id+"/accepted")
        const data = await resp.status;
        navigate("/completerequest" , { state: { from: data } });
    };

    const DeclineInvite = async () => {
        const resp = await fetch('http://scbackend-env.eba-93hey2mi.eu-north-1.elasticbeanstalk.com/'+from.user_notified+"/"+from.role_id+"/declined")
        const data = await resp.status;
        navigate("/completerequest" , { state: { from: data } });
    };

    return (
        <div className="app">
            <Sidebar/>
            <div className="msg-page">
                <div className="msg-page-content">
                    <div className='msg-container'>
                        <div className='msg-header'>You have been invited to a project !</div>
                        <div className="msg-body">This project was created on {from.date_created} by 
                        <Link to={userProfile}>{" " + from.project_author}</Link>.
                        The role is titled {role}.
                        For more information, please view the project linked below
                        <Link to={projectLink}> Project Id: {from.project_id + ". "}</Link>
                        On completion of research, please accept or decline the invite.
                        </div>
                    </div>
                    <div className="msg-footer">
                        <button type="button" style={{"backgroundColor": "green"}} onClick={AcceptInvite}>
                            Accept
                        </button>
                        <button type="button" style={{"marginLeft": "1em", "backgroundColor": "red"}} onClick={DeclineInvite}>
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MsgInvite;