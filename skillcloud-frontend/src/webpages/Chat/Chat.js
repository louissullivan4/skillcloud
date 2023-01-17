import React, { useEffect, useState, } from 'react'
import { useLocation  } from 'react-router-dom'

import Sidebar from "../../components/Sidebar";

import "../../index.css";


const Chat = () => {
    // window.setTimeout(function(){ document.location.reload(true); }, 5000);
    const location = useLocation()

    const sender = location.state.email
    const receiver = location.state.contact

    const [chatHistory, setChatHistory] = useState([]);
    const [newChat, setNewChat] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://127.0.0.1:5000/chat/'+ sender + "/" + receiver)
        const data = await resp.json();
        setChatHistory(data.result);
      };
      fetchData()
    }, []);
    
    const sendMessage = async (e) => {
        e.preventDefault();
        newChat.sender = sender
        newChat.receiver = receiver
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        newChat.time = time.toString()
        newChat.date = date.toString()
        let updateChat = [...chatHistory, newChat]
        setChatHistory(updateChat)
        const resp = await fetch(`http://127.0.0.1:5000/updateMsg`, {'method':'POST', headers : {'Content-Type':'application/json'}, body: JSON.stringify(newChat)})
        if (resp.status !== 200) {
            alert("Errorr in sending message. Please try again.");
            window.location.reload(false);
        }
    }

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
                        <div className="container-2">
                            <div className="row">
                                <form>
                                    <input type="text" placeholder="Type a message" onChange={(e) => setNewChat({content: e.target.value})}/>
                                    <button type="submit" onClick={sendMessage}>Send</button>
                                </form>
                            </div>
                        </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    );
}
export default Chat;