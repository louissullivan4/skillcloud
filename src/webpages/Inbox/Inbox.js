import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const Inbox = () => {
    const email = localStorage.getItem("email")

    const [inboxData, setInboxData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://scbackend-env.eba-93hey2mi.eu-north-1.elasticbeanstalk.com/inbox/'+email)
        const data = await resp.json();        
        setInboxData(data.result);
      };
      fetchData()
    }, []);

    return (
        <div className="app">
            <Sidebar/>
            <div className="inbox">
                <div className="inbox-heading">
                    <h1>Inbox</h1>
                </div>
                <div className='inbox-body'>
                <table>
                    <thead>
                        <tr>
                            <th>Sender</th>
                            <th>Message</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inboxData.map((inboxData, k) => (
                            <Link style={{"textDecoration": "none"}} to={
                            inboxData.status === "accepted" && inboxData.type === "project_apply" ? "/msgapplyresponse" 
                            : inboxData.status === "declined" && inboxData.type === "project_apply" ? "/msgapplyresponse" 
                            : inboxData.status === "pending" && inboxData.type === "project_apply" ? "/msgapply" 
                            : inboxData.status === "pending" && inboxData.type === "project_invite" ? "/msginvite" 
                            : inboxData.type === "project_role_wait" ? "/msgnousers" 
                            : inboxData.status === "accepted" || inboxData.status === "declined" ? "/msgresponse"  
                            : "/msg"} 
                            state={{ from: inboxData }}>
                                <tr key={k}>
                                    {inboxData.type === "project_apply" ? <td>{inboxData.user_notified}</td> : <td>{inboxData.project_author}</td>}
                                        <td>
                                            {inboxData.status === "declined" && inboxData.type === "project_apply" ? "Manual Role Application Declined" 
                                            : inboxData.status === "accepted" && inboxData.type === "project_apply" ? "Manual Role Application Accepted!" 
                                            : inboxData.status === "pending" && inboxData.type === "project_apply" ? "Manual Role Application Received"
                                            : inboxData.status === "pending" && inboxData.type === "project_invite" ? "Project Invitation!" 
                                            : inboxData.type === "project_role_wait" ? "No User Matches" 
                                            : inboxData.status === "accepted" || inboxData.type === "declined" ? "Project Role Update!" 
                                            : "Click to see more..." }
                                        </td>
                                    <td>{inboxData.status === "pending" ? "Pending" 
                                    : inboxData.status === "accepted" ? "Accepted" 
                                    : inboxData.status === "declined" ? "Declined" 
                                    : ""}</td>
                                </tr>
                            </Link>
                        ))}
                    </tbody>
                </table>
            </div>
         </div>
    </div>
    );
}
export default Inbox;