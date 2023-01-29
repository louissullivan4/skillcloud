import React, { useEffect, useState, useRef } from 'react'
import { useParams  } from 'react-router-dom'

import { setDoc, doc, getDocs, updateDoc, getDoc, onSnapshot, arrayUnion, Timestamp, collection, query, where } from "firebase/firestore";
import { db } from '../../firebase'

import { UserAuth } from '../../context/AuthContext'

import Sidebar from "../../components/Sidebar";
import "../../index.css";


const Chat = () => {
    let email = localStorage.getItem("email")
    let chatId = useParams();
    const { user } = UserAuth()
    const scroll = useRef(null)
    let senderid = chatId.senderid
    let recieverid = chatId.recieverid

    const [idUsed, setIdUsed] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [newChat, setNewChat] = useState("");
    const [name , setName] = useState("")

    const getName = async () => {
        const q = query(collection(db, "users"),where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setName(doc.data().name);
        });
    }


    useEffect(() => {
        async function getData() {
            await getName()
            let idSet;
            let combinedId = senderid + recieverid;
            const res = await getDoc(doc(db, "messages", combinedId));
            if (!res.exists()) {
                let otherid = recieverid + senderid
                const res1 = await getDoc(doc(db, "messages", otherid));
                if (!res1.exists()) {
                    await setDoc(doc(db, "messages", combinedId), { messages: [] });
                    await updateDoc(doc(db, "users", senderid), {
                        contacts: arrayUnion(recieverid)
                    });
                    await updateDoc(doc(db, "users", recieverid), {
                        contacts: arrayUnion(senderid)
                    });
                } else if (res1.exists()) {
                    idSet = otherid
                    setIdUsed(otherid)
                }
            } else {
                idSet = combinedId
                setIdUsed(combinedId)
            }
            const unSub = onSnapshot(doc(db, "messages", idSet), (doc) => {
                setChatHistory(doc.data().messages);
            });
            return () => {
                unSub();
            };
            
        }
        getData();
    }, []);

    useEffect(() => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);
          
    async function sendMessage(e) {
        e.preventDefault();
        console.log(idUsed)
        await updateDoc(doc(db, "messages", idUsed), {
            messages: arrayUnion({
              uid : user.uid,
              text: newChat,
              sender: name,
              date: Timestamp.now()
            }),
          });
        setNewChat("")
    }
        
    return (
            <div className="msg-app">
                <Sidebar/>
                <div className="chat-header">
                <h1 className='chatTitle'>Chat</h1>
                {(chatHistory.length < 1) ? 
                    <div className='no-msg'>
                        Looks very quiet in this chat...
                    </div>
                : null }
                </div>
                <div className="message-page">
                    <div className="messages">
                        {(chatHistory.length > 0) ?
                            chatHistory.map(({ id, text, sender, uid }) => (
                                (uid === user.uid) ?
                                    <div key={id}>
                                        <div className='sender'>{sender}</div>
                                        <div className='sent'>{text}</div>
                                    </div>
                                    :
                                    <div key={id}>
                                        <div className='receiver'>{sender}</div>
                                        <div className='message-receiver'>{text}</div>
                                    </div>
                            ))
                            : null }

                        <form className='submitMsg'>
                            <input className="inputMsg" type="text" placeholder="Type a message" onChange={e => setNewChat(e.target.value)} value={newChat}/>
                            <button className="sendBut" type="submit" onClick={sendMessage}>Send</button>
                        </form>
                        <div ref={scroll}></div>
                    </div>  
                </div>
            </div>
        );
    }

export default Chat;