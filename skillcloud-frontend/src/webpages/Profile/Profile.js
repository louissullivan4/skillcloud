import React, { useEffect, useState } from 'react'

import Sidebar from "../../components/Sidebar";
import ProfileTabs from '../../components/Profile/ProfileTabs';

import "../../index.css";

const Profile = () => {
    const email = localStorage.getItem("email")
    const [userData, setUserData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://127.0.0.1:5000/profile/'+email)
        const data = await resp.json();
        setUserData(data.result[0]);
        // console.log(userData.profilepic)
      };
      fetchData()
    }, []);

    
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
                                        <div className="card-image"><img src={require(`../../assets/profiles/${userData.profilepic}.jpg`)} height="150" width="auto" alt="Profile Pictures"/></div>
                                        <div className="card-text">{userData.fname} {userData.lname}</div>
                                        <div className="card-text">{userData.job_title}</div>
                                        <div className="card-text">{userData.location}</div>
    
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