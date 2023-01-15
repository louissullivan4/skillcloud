import React, { useEffect, useState } from 'react'

import Sidebar from "../../components/Sidebar";

import "../../index.css";


const Chat = () => {

    let sender = "sullivanlouis0@gmail.com";
    let receiver = "admin@gmail.com";

    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://127.0.0.1:5000/chat/'+ sender + "/" + receiver)
        const data = await resp.json();
        setChatHistory(data.result);
        console.log(data.result);
      };
      fetchData()
    }, []);

    return (
        <div className="app">
            <Sidebar/>
            <div className="page">
                <div className="page-content">
                    <div className="container-1">
                    <div className='row'>
                        {chatHistory.map((chat, k) => (
                            <div className='col'>
                                <div className='row' key={k}>
                                    <div className='row-header'>{chat.sender}</div>
                                        <div className='row-body'>
                                            {chat.content}
                                        </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    );
}
export default Chat;