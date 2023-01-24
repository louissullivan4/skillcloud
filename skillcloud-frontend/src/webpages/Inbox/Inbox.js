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
        console.log(data.result)
      };
      fetchData()
    }, []);

    return (
        <div className="app">
            <Sidebar/>
            <div className="project">
                <div className="project-heading">
                    <div className="project-heading-title">
                        <h1>Inbox</h1>
                    </div>
                </div>
                <div className='inbox'>
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Message</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {inboxData.map((inboxData, k) => (
                            <Link to={inboxData.status === "pending" && inboxData.type === "project_invite" ? "/msginvite" : inboxData.type === "project_role_wait" ? "/msgnousers" : inboxData.status === "accepted" || inboxData.status === "declined" ? "/msgresponse" : "/msg"} state={{ from: inboxData }}>
                                <tr key={k}>
                                    <td>{inboxData.project_author}</td>
                                    <td>
                                        {inboxData.status === "pending" && inboxData.type === "project_invite" ? "You have received a project invite!" : inboxData.type === "project_role_wait" ? "No users found !" : inboxData.status === "accepted" || inboxData.type === "declined" ? "You have received a role update to one of your projects!" : "Click to see more" }
                                    </td>
                                    <td>{inboxData.status === "pending" ? "Pending" : inboxData.status === "accepted" ? "Accepted" : inboxData.status === "declined" ? "Declined" : ""}</td>
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