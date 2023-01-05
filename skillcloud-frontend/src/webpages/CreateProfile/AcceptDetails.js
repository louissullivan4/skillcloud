import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

import "../../index.css";

const AcceptDetails = () => {
    const location = useLocation()
    let navigate = useNavigate();
    const state = location.state
    console.log(state)
    const completeProfile = async () => {
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
        <div className="flex justify-center items-center h-screen bg-indigo-100">
            <div className="bg-white rounded shadow-2xl w-11/12 md:w-9/12 lg:w-1/2">
            <div className='header'>Create Profile</div>
                <div className='header2'>Are these details correct?</div>
                <div className='text'>Name: {state.fname} {state.lname}</div>
                <div className='text'>Location: {state.city}, {state.country}</div>
                <div className='text'>Profession: {state.title}</div>
                <div className='text'>Profession Category: {state.category}</div>
                <div className='text'>Description of profession profile: {state.desc}</div>
                <div className='text'>Certifications: {state.certs.map((cert) => { return <div>{cert.certName}</div>})}</div>
                <div className='text'>Education:</div>
                {state.education.map((edu) => (
                    <div key={edu.degree}>
                        <div>{edu.edu_type}</div>
                        <div>{edu.edu_degree}</div>
                        <div>{edu.edu_type}</div>
                        <div>{edu.edu_desc}</div>
                    </div>
                ))};
                {state.experience.map((exp) => (
                    <div key={exp.experience_name}>
                        <div>{exp.experience_name}</div>
                        <div>{exp.experience_title}</div>
                        <div>{exp.experience_start}</div>
                        <div>{exp.experience_end}</div>
                        <div>{exp.experience_desc}</div>
                    </div>
                ))};
                <button className="backBut" type="button" onClick={goBack}>
                        Back
                </button>
                <button className="completeBut" type="button" onClick={completeProfile}>
                        Complete
                </button>
            </div>
        </div>
    );
}
export default AcceptDetails;