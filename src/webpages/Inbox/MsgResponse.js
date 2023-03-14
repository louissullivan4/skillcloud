import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const MsgResponse = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { from } = location.state
    const [completion, setCompletion] = useState([]);
     
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


    const addUser = async () => {
        const resp = await fetch('http://scbackend-env.eba-93hey2mi.eu-north-1.elasticbeanstalk.com/'+from.user_notified+"/"+from.role_id+"/add")
        const data = await resp.json();
        setCompletion(data.result);
        navigate("/completerequest" , { state: { from: completion } });
    };

    const removeUser = async () => {
        const resp = await fetch('http://scbackend-env.eba-93hey2mi.eu-north-1.elasticbeanstalk.com/'+from.user_notified+"/"+from.role_id+"/remove")
        const data = await resp.json();
        setCompletion(data.result);
        navigate("/completerequest" , { state: { from: completion } });
    };
    return (
        <div className="app">
            <Sidebar/>
            <div className="msg-page">
                <div className="msg-page-content">
                    <div className='msg-container'>
                        <div className='msg-header'>{from.status === "accepted" ? "Accepted!" : from.status === "declined" ? "Declined" : "Error"}</div>
                        <div className="msg-body">
                            <div className="msg-para1">The request for a {role} for project id <Link to={projectLink}>{from.project_id}</Link> has 
                            been {from.status} by <Link to={userProfile}>{from.user_notified}</Link>.</div>
                            <div className="msg-para2">Would you like to add or remove them from the project?
                            <div className="msg-footer">{from.status === "accepted" ? 
                                <button type="button" className="but-neg" onClick={removeUser}>
                                    Remove
                                </button>
                                : from.status === "declined" ? 
                                <button type="button" className="but-pos" onClick={addUser}>
                                    Add
                                </button> : ""}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MsgResponse;