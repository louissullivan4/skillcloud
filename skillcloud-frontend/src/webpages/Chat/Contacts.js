import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Sidebar from "../../components/Sidebar";

import "../../index.css";

const Contacts = () => {
    const email = localStorage.getItem("email")

    const [contacts, setContacts] = useState([]);
    const [searchContacts, setSearchContacts] = useState([]);

    const [newSearch, setNewSearch] = useState([]);
    const [charEnter, setCharEnter] = useState("");

    const handleSearch = (event) => {
        const searchWord = event.target.value;
        setCharEnter(searchWord);
        const search = searchContacts.filter((value) => {
            return value.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setNewSearch([]);
        } else {
            setNewSearch(search);
        }
    };

    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://127.0.0.1:5000/contacts/'+ email)
        const data = await resp.json();
        setContacts(data.result);
        const newresp = await fetch('http://127.0.0.1:5000/searchcontacts/'+ email)
        const newdata = await newresp.json();
        setSearchContacts(newdata.result);
      };
      fetchData()
    }, []);

    return (
        <div className="app">
            <Sidebar/>
            <div className="page">
                <div className="search-box">
                    <input type="text" value={charEnter} onChange={handleSearch} placeholder={"Enter a user email..."} />
                </div>
                <div className='search-values-body'>
                    {newSearch.slice(0, 15).map((value, key) => {
                        return (
                            <Link to="/chat" state={{ email: email, contact: value.contact }}>
                                <div className="dataItem" key={key}>
                                <p>{value}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className='row'>
                    {contacts.map((contact, k) => (
                        <Link to="/chat" state={{ email: email, contact: contact.contact }} style={{textDecoration: "none"}}>
                            <div className='row' key={k}>
                                <div className='row-header'>{contact.contact}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>  
        </div>
    );
}
export default Contacts;