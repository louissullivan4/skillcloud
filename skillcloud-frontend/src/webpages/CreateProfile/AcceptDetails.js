import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

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
    
    const { createUser } = UserAuth()

    console.log(state.experience)
    const addUser = async () => {
        console.log(state.email, state.password)
        await createUser(state.email, state.password)
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            email: auth.currentUser.email,
            uid : auth.currentUser.uid,
            name: state.fname + " " + state.lname,
        });
        
    };

    const completeProfile = async () => {
        addUser();
        const resp = await fetch(`http://127.0.0.1:5000/createuser`,{'method':'POST', headers : {'Content-Type':'application/json'}, body: JSON.stringify(state)})
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
        <div className='create-profile-page'>
            <div className='create-profile-heading'>
                <div>Create Profile</div>
            </div>
            <div className='create-profile-title'>Are these details correct?</div>
            <div className='create-profile-final'>
                <div className='text'>Name: {state.fname} {state.lname}</div>
                <div className='text'>Location: {state.city}, {state.country}</div>
                <div className='text'>Profession: {state.title}</div>
                <div className='text'>Profession Category: {state.category}</div>
                <div className='text'>Professional profile: {state.desc}</div>
                <div className='text'>Certifications: {state.certs.map((cert) => { return <div>{cert.certName}</div>})}</div>
                <div className='text'>Education:</div>
                {state.education.map((edu) => (
                    <div key={edu.degree}>
                        <div className='text'>{edu.edu_type} {edu.edu_degree} at {edu.edu_school}</div>
                        <div>{edu.edu_desc}</div>
                    </div>
                ))};
                {state.experience.map((exp) => (
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
    );
}
export default AcceptDetails;