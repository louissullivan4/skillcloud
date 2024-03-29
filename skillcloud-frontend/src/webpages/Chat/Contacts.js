import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import Sidebar from "../../components/Sidebar";
import "../../index.css";

const Contacts = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [user, setUser] = useState({});
    const [history, setHistory] = useState([]);
    const [currentUser, setCurrentUser] = useState("");
    const [err, setErr] = useState(false);

    let email = localStorage.getItem("email")

    useEffect(() => {
        async function getHistory() {
            let contactList;
            const q = query(
            collection(db, "users"),
            where("email", "==", email)
            );
            try {
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    contactList = doc.data().contacts
                });
                const q1 = query(
                    collection(db, "users"),
                    where("uid", "in", contactList)
                );
                let historyList = [];
                const querySnapshot1 = await getDocs(q1);
                querySnapshot1.forEach((doc) => {
                    historyList = [...historyList, doc.data()];
                });
                setHistory(historyList);
            }
            catch (err) {
                console.log(err)
            }
            } getHistory();
    }, [email]);

    useEffect(() => {
        async function getUid() {
            const q = query(
            collection(db, "users"),
            where("email", "==", email)
            );
            try {
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setCurrentUser(doc.data());
                });
            }
            catch (err) {
                console.log(err)
            }
            } getUid();
    }, [email]);


    const handleSearch = async () => {
        const q = query(collection(db, "users"),where("email", "==", username));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            setErr(true)
            return;
        }
        querySnapshot.forEach((doc) => {
            setUser(doc.data());
        });
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        // const combinedId = user.uid + currentUser.uid;
        navigate(`/chat/${user.uid}/${currentUser.uid}`)
        setUser(null);
        setUsername("")
    };

    return (
            <div className="app">
                <Sidebar/>
                <div className="contact-page">
                    <h1>Contact User</h1>
                    <div className="contact-input">
                        <input
                            type="text"
                            placeholder="Search for a user's email..."
                            onKeyDown={handleKey}
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        /> 
                        <button className="contact-button" onClick={handleSearch}>Search</button>
                    </div>
                    {err && <div className="contact-text" style={{"color" : "red"}}>User not found!</div>}
                            {user && (
                                <div className="contact-text" onClick={handleSelect}>
                                    {user.name}
                                </div>
                    )}
                <div className="contacts">
                <h2>Previous Contacts</h2>
                    <div className="contact-user-list">
                        {history.map((contact) => (
                        <Link to={`/chat/${contact.uid}/${currentUser.uid}`} style={{"textDecoration" : "none"}}>
                            <div key={contact.uid}>
                                <div>{contact.name}</div>
                            </div>
                        </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        );
    };

export default Contacts;