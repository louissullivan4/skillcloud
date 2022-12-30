import React, { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const MsgResponse = () => {
    // let email = localStorage.user;
    const location = useLocation()
    const navigate = useNavigate()
    const { from } = location.state
    const [completion, setCompletion] = useState([]);
     
    let projectLink = "/project/" + from.project_id

    const addUser = async () => {
        console.log("Invite accepted")
        const resp = await fetch('http://127.0.0.1:5000/usereligibility/'+from.project_author+"/"+from.user_notified+"/"+from.role_id+"/add")
        const data = await resp.json();
        setCompletion(data.result);
        navigate("/completerequest" , { state: { from: completion } });
    };

    const removeUser = async () => {
        const resp = await fetch('http://127.0.0.1:5000/usereligibility/'+from.project_author+"/"+from.user_notified+"/"+from.role_id+"/remove")
        const data = await resp.json();
        setCompletion(data.result);
        navigate("/completerequest" , { state: { from: completion } });
    };
    return (
        <div className="app">
            <Sidebar/>
            <div className="page">
                <div className="page-content">
                    <div className='container-1'>
                        <div className='header'>{from.status === "accepted" ? "Accepted!" : from.status === "declined" ? "Declined" : "Error"}</div>
                        <div className="body">
                            <div className="para1">The request for project id <Link to={projectLink}>{from.project_id}</Link> has been {from.status} by {from.user_notified}.</div>
                            <div className="para2">Would you like to add or remove them from the project?
                            <br></br>
                            <div className="buttons">{from.status === "accepted" ? 
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