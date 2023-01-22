import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import Sidebar from "../../components/Sidebar";
import "../../index.css";

const Contacts = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [user, setUser] = useState({});
    const [currentUser, setCurrentUser] = useState("");
    const [err, setErr] = useState(false);

    let email = localStorage.getItem("email")
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
            } catch (err) {
                setErr(true);
            }
        } getUid()
    }, []);


    const handleSearch = async () => {
        const q = query(collection(db, "users"),where("email", "==", username));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUser(doc.data());
        });
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        const combinedId = user.uid + currentUser.uid;
        navigate(`/chat/${combinedId.toString()}/${username}`)
        setUser(null);
        setUsername("")
    };

    return (
            <div className="app">
                <Sidebar/>
                <div>
                    <input
                    type="text"
                    placeholder="Search for a user's email..."
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    /> 
                </div>
                {err && <span>User not found!</span>}
                    {user && (
                        <div onClick={handleSelect}>
                            <div>
                                <span>{user.email}</span>
                            </div>
                        </div>
                    )}
            </div>
        );
    };

export default Contacts;