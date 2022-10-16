import React, { useEffect, useState } from 'react'

import Sidebar from "../components/Sidebar";
import ProfileTabs from '../components/ProfileTabs';

import "../index.css";

function Profile () {
    localStorage.setItem("username", "sullivanlouis0@gmail.com");
    let email = "sullivanlouis0@gmail.com"
    const [userData, setUserData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://127.0.0.1:5000/profile/'+email)
        const data = await resp.json();
        setUserData(data.result[0]);
      };
      fetchData()
    }, []);
    const imageName = "louis";
    return (
        <div className="app">
            <Sidebar/>
            <div className="page">
                <div className="page-content">
                    <div className="container-1">
                        <div className="row">
                            <div className="col">
                                <div className="card">
                                    <div className="card-body-profile">
                                        <div className="card-image"> <img src={require(`../assets/profiles/${imageName}.jpg`)} height="150" width="auto" alt="Profile Pictures"/></div>
                                        <div className="card-text">{userData.fname} {userData.lname}</div>
                                        <div className="card-text">{userData.job_title}</div>
                                        <div className="card-text">{userData.email}</div>
    
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">Summary</div>
                                <div className="card-body">
                                    <div className="card-text">{userData.job_desc}</div>
                                    <br></br>
                                    <div className="card-text">Status: {userData.availability}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="container-2">
                        <ProfileTabs/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;