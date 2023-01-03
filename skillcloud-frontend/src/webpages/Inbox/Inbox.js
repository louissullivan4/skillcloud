import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const Inbox = () => {
    const email = localStorage.getItem("email")

    const [inboxData, setInboxData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://127.0.0.1:5000/inbox/'+email)
        const data = await resp.json();        
            setInboxData(data.result);
      };
      fetchData()
    }, []);

    return (
        <div className="app">
            <Sidebar/>
            <div className="page">
                <div className="page-content">
                <div className='container'>
                    <div className='row'>
                        {inboxData.map((inboxData, k) => (
                            <div className='col'>
                                    <Link to={inboxData.status === "pending" && inboxData.type === "project_invite" ? "/msginvite" : inboxData.type === "project_role_wait" ? "/msgnousers" : inboxData.status === "accepted" || inboxData.status === "declined" ? "/msgresponse" : "/msg"} state={{ from: inboxData }}>
                                    <div className='row' key={k}>
                                        <div className='row-header'>{inboxData.project_author}</div>
                                            <div className='row-body'>
                                                {inboxData.status === "pending" && inboxData.type === "project_invite" ? "You have received a project invite!" : inboxData.type === "project_role_wait" ? "No users found !" : inboxData.status === "accepted" || inboxData.type === "declined" ? "You have recived a role update to one of your projects!" : "Click to see more" }
                                            </div>
                                        <div className='card-footer'>Status: {inboxData.status}</div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Inbox;