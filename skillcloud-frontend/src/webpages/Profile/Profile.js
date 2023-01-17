import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Sidebar from "../../components/Sidebar";
import ProfileTabs from '../../components/Profile/ProfileTabs';

import "../../index.css";

const Profile = () => {
    // const email = localStorage.getItem("email")
    let email = useParams()
    let navigate = useNavigate()


    const handleClick = () => {
        navigate("/chat", { state: { email: localStorage.getItem("email"), contact: email.email} })
    }    
    const [userData, setUserData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://127.0.0.1:5000/profile/'+email.email)
        const data = await resp.json();
        setUserData(data.result[0]);
      };
      fetchData()
    }, []);
    return (
        <div className="app">
            <Sidebar/>
            <div className="p-page">
                <div className="p-page-content">
                    <div className="p-container-1">
                        <div className="p-row">       
                            <div className="p-col">
                                <div className="p-card">
                                    <div className="p-card-body-profile">
                                        <div className="p-card-image">{userData.profilepic ? <img src={require(`../../assets/profiles/${userData.profilepic}.jpg`)} height="150" width="auto" alt="Profile Pictures"/> : <img src={require(`../../assets/profiles/undefined.jpg`)} height="150" width="auto" alt="Profile Pictures"/>}</div>
                                        <div className="p-card-text">{userData.fname} {userData.lname}</div>
                                        <div className="p-card-text">{userData.job_title}</div>
                                        <div className="p-card-text">{userData.city}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className="p-row">
                        <div className="p-col">
                            <div className="p-card">
                                <div className="p-card-header">Summary</div>
                                <div className="p-card-body">
                                    <div className="p-card-text">{userData.job_desc}</div>
                                    <br></br>
                                    <div className="p-card-text">Status: {userData.availability}</div>
                                </div>
                            </div>
                        </div>
                    </div>  
                    {email.email !== localStorage.getItem('email') ? <button type="button" onClick={handleClick}>Send Message </button> : <div></div>}
                    </div>
                    <div className="p-container-2">
                        <ProfileTabs/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;