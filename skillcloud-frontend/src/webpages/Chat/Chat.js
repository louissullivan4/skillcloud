import React, { useEffect, useState } from 'react'
import { useParams  } from 'react-router-dom'

import { setDoc, doc, getDocs, updateDoc, getDoc, onSnapshot, arrayUnion, Timestamp, collection, query, where } from "firebase/firestore";
import { db } from '../../firebase'

import Sidebar from "../../components/Sidebar";
import "../../index.css";


const Chat = () => {
    let email = localStorage.getItem("email")
    let chatId = useParams();
    let senderid = chatId.senderid
    let recieverid = chatId.recieverid
    let combinedId = senderid + recieverid;
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
            const res = await getDoc(doc(db, "messages", combinedId));
            if (!res.exists()) {
                await setDoc(doc(db, "messages", combinedId), { messages: [] });
                await updateDoc(doc(db, "users", senderid), {
                    contacts: arrayUnion(recieverid)
                });
                await updateDoc(doc(db, "users", recieverid), {
                    contacts: arrayUnion(senderid)
                });
            }
            const unSub = onSnapshot(doc(db, "messages", combinedId), (doc) => {
                setChatHistory(doc.data().messages);
            });
            return () => {
                unSub();
            };
            
        }
        getData();
    }, []);
          
    async function sendMessage(e) {
        e.preventDefault();
        await updateDoc(doc(db, "messages", combinedId), {
            messages: arrayUnion({
              text: newChat,
              sender: name,
              date: Timestamp.now()
            }),
          });
        setNewChat("")
    }
        
    return (
            <div className="app">
                <Sidebar/>
                <div className="page">
                    <div className="page-content">
                        <div className="container-1">
                            {(chatHistory.length > 0) ?
                                chatHistory.map(({ id, text, sender }) => (
                                    <div>
                                        <div key={id}>
                                            <h5>{sender}</h5>
                                            <p>{text}</p>
                                        </div>
                                    </div>
                                ))
                                : <div>
                                    <div>
                                        <p>Looks very quiet in this chat...</p>
                                    </div>
                                </div>}
                            <form >
                                <input type="text" placeholder="Type a message" onChange={e => setNewChat(e.target.value)} value={newChat}/>
                                <button type="submit" onClick={sendMessage}>Send</button>
                            </form>
                        </div>  
                    </div>
                </div>
            </div>
            
        );
    }

export default Chat;