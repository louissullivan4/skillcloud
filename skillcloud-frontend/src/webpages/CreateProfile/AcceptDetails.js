import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import BeatLoader from 'react-spinners/BeatLoader'

import {
    setDoc,
    doc,
  } from "firebase/firestore";

import { db, auth } from "../../firebase";
import { UserAuth } from '../../context/AuthContext'

import "../../index.css";

const AcceptDetails = () => {
    const location = useLocation()
    let navigate = useNavigate();
    const state = location.state
    const [spinner, setSpinner] = useState(false);

    const [photo, setPhoto] = useState("")
    const { createUser, updateProfilePic } = UserAuth()
    
    const addUser = async () => {
        await createUser(state.email, state.password)
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            email: auth.currentUser.email,
            uid : auth.currentUser.uid,
            name: state.fname + " " + state.lname,
        });
        await updateProfilePic(photo, auth.currentUser.uid)
    };

    function handleChange(e) {
        if (e.target.files[0]) {
          setPhoto(e.target.files[0])
        }
    }

    const completeProfile = async () => {
        setSpinner(true);
        addUser();
        const resp = await fetch(`http://127.0.0.1:5000/createuser`,{'method':'POST', headers : {'Content-Type':'application/json'}, body: JSON.stringify(state)})
        .then(setSpinner(false))
        if (resp.status === 200) {
            alert("User created successfully. Proceed to login.");
            navigate('/');
        } else {
            alert("User creation failed. Please try again.");
        }
    }

    const goBack = () => {
        navigate(-1)
    }

    
    return (
        ( spinner === true ? 
            <BeatLoader color="#36d7b7" /> :
        <div className='create-profile-page'>
            <div className='create-profile-heading'>
                <div>Create Profile</div>
            </div>
            <div className='create-profile-title'>Are these details correct?</div>
            
            <div className='create-profile-final'>
                <div className="edit-profile">
                    <label htmlFor="file">Add Profile Image</label>
                    <img src={photo} style={{"height": "130px", "width": "100px", "marginRight":"1.5em"}}/>
                    <input type="file" onChange={handleChange}/>
                </div>
                <div className='text'>Name: {state.fname} {state.lname}</div>
                <div className='text'>Location: {state.city}, {state.country}</div>
                <div className='text'>Profession: {state.job_title}</div>
                <div className='text'>Profession Category: {state.job_category}</div>
                <div className='text'>Professional profile: {state.job_desc}</div>
                <div className='text'>Certifications: {state.certifications.map((cert) => { return <div>{cert.certName}</div>})}</div>
                <div className='text'>Education:</div>
                {state.education.map((edu) => (
                    <div key={edu.degree}>
                        <div className='text'>{edu.edu_type} {edu.edu_degree} at {edu.edu_school}</div>
                        <div>{edu.edu_desc}</div>
                    </div>
                ))};
                {state.work_experience.map((exp) => (
                    <div key={exp.experience_name}>
                        <div>{exp.experience_title} at {exp.experience_name}</div>
                        <div>{exp.experience_start} - {exp.experience_end}</div>
                        <div>{exp.experience_desc}</div>
                    </div>
                ))};
                <div className='button-group'>
                    <button type="button" onClick={goBack} style={{"backgroundColor": "darkblue"}}>
                            Back
                    </button>
                    <button type="button" onClick={completeProfile}>
                            Complete
                    </button>
                </div>
            </div>
        </div>
        )
    );
}
export default AcceptDetails;