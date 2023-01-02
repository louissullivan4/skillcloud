import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const Inbox = () => {
    // let email = localStorage.user;
    let email = "louis@gmail.com"

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
            <div className="page">
                <div className="page-content">
                <div className='container'>
                    <div className='row'>
                        {inboxData.map((inboxData, k) => (
                            <div className='col'>
                                    <Link to={inboxData.status === "pending" ? "/msginvite" : inboxData.status === "accepted" || inboxData.status === "declined" ? "/msgresponse" : "/msg"} state={{ from: inboxData }}>
                                    <div className='row' key={k}>
                                        <div className='row-header'>{inboxData.project_author}</div>
                                            <div className='row-body'>
                                                {inboxData.status === "pending" ? "You have received a project invite!" : inboxData.status === "accepted" || inboxData.type === "declined" ? "You have recived a role update to one of your projects!" : "Click to see more" }
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