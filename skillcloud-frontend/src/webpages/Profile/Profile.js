import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { UserAuth } from '../../context/AuthContext'
import { auth } from '../../firebase'

import Sidebar from "../../components/Sidebar";
import ProfileTabs from '../../components/Profile/ProfileTabs';

import "../../index.css";

const Profile = () => {
    let currentEmail = localStorage.getItem("email")
    let email = useParams()
    let navigate = useNavigate()    
    const [userData, setUserData] = useState("");
    const [emailUser, setEmailUser] = useState({});
    const [currentUser, setCurrentUser] = useState("");
    const [profileName, setProfileName] = useState("");
    const { createUser, deleteAUser } = UserAuth()
    


    const [photo, setPhoto] = useState("");


    const getName = async () => {
        const q = query(collection(db, "users"),where("email", "==", email.email));
        const querySnapshot = await getDocs(q);
        setProfileName(querySnapshot.docs[0].data().uid)
    }
    
    const getProfilePic = async () => {
        getName()
        const storage = getStorage();
        const url = await getDownloadURL(ref(storage, `profile/${profileName}`));
        setPhoto(url);
    }
    getProfilePic();

    // const deleteProfilePic = async () => {
    //     const storage = getStorage();
    //     const desertRef = ref(storage, `profile/${profileName}`);
    //     await deleteObject(desertRef);
    // }
           
    // const handleClick = async () => {
    //     const q = query(collection(db, "users"),where("email", "==", email.email));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         setEmailUser(doc.data().uid);
    //     });
    //     const q1 = query(collection(db, "users"),where("email", "==", currentEmail));
    //     const querySnapshot1 = await getDocs(q1);
    //     querySnapshot1.forEach((doc) => {
    //         setCurrentUser(doc.data().uid);
    //     });
    // //     const combinedId = emailUser + currentUser;
    //     navigate(`/chat/${combinedId.toString()}/${email.email}`)
    // };

    const editProfile = () => {
        navigate("/editprofile", { state: { email: localStorage.getItem("email"), details: userData} })
    }
    
    const deleteUser = async () => {
        if (window.confirm("Are you sure you want to delete your profile?")) {
            await fetch('http://localhost:5000/deleteuser/'+currentEmail)
            await deleteAUser(auth.currentUser)
            // const q = query(collection(db, "users"),where("email", "==", currentEmail));
            // await deleteDoc(q);
            // const q1 = query(collection(db, "messages"),where("uid", "==", auth.currentUser.uid));
            // await deleteDoc(q1);
            // await deleteProfilePic()
            // navigate("/")
        }
      }


    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://127.0.0.1:5000/profile/'+email.email)
        const data = await resp.json();
        setUserData(data.result[0]);
      };
      fetchData()
    }, [email.email]);
      
    
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
                                        <div className="p-card-image"><img src={photo} height="150" width="auto" alt="Profile Pictures"/></div>
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
                    <div className="profile-button">
                        {/* {email.email !== localStorage.getItem('email') ? <button type="button" onClick={handleClick}>Send Message </button> : <button type="button" onClick={editProfile}>Edit Profile </button>} */}
                        {email.email !== localStorage.getItem('email') ? <div></div> : <button type="button" onClick={editProfile}>Edit Profile </button>}
                        {email.email !== localStorage.getItem('email') ? <div></div> : <button type="button" style={{"backgroundColor" : "red"}} onClick={deleteUser}>Delete Profile </button>}
                    </div>
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