import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Sidebar from "../../components/Sidebar";

import "../../index.css";

const Contacts = () => {
    const email = localStorage.getItem("email")

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://127.0.0.1:5000/contacts/'+ email)
        const data = await resp.json();
        setContacts(data.result);
        console.log(data.result);
      };
      fetchData()
    }, []);

    return (
        <div className="app">
            <Sidebar/>
            <div className="page">
                <div className="page-content"> 
                    <div className='row'>
                        {contacts.map((contact, k) => (
                            <Link to="/chat" state={{ email: email, contact: contact }} style={{textDecoration: "none"}}>
                                <div className='row' key={k}>
                                    <div className='row-header'>{contact.contact}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>  
            </div>
        </div>
    );
}
export default Contacts;