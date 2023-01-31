import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

import "../../index.css";

const MoreDetails = () => {
    const location = useLocation()
    let navigate = useNavigate();
    const state = location.state
    const [newEducation, setNewEducation] = useState({
        education: [{
            edu_type: "",
            edu_degree: "",
            edu_school: "",
            edu_desc: "",
        },]
    });
    const [newExperience, setNewExperience] = useState({
        work_experience: [{
            experience_name: "",
            experience_title: "",
            experience_start: "",
            experience_end: "",
            experience_desc: "",
        },]
    });
    const submitHandler = (e) => {
        e.preventDefault()
        if (!validated()){
            alert("Please fill in all fields")
        } else {
            let finalInfo = {...state, education: newEducation.education, work_experience: newExperience.experience}
            navigate('/acceptdetails', {state:{ ...finalInfo, email: state.email,  password: state.password}})
        }
    }

    const validated = () => {  
        let valid = true
        if (newEducation.education.length > 0){
            newEducation.education.forEach((edu) => {
                if (edu.edu_degree === "" || edu.edu_school === "" || edu.edu_desc === ""){
                    valid = false
                }
            })
        }
        if (newExperience.experience.length > 0){
            newExperience.experience.forEach((exp) => {
                if (exp.experience_name === "" || exp.experience_title === "" || exp.experience_desc === "" || exp.experience_start === "" || exp.experience_end === ""){
                    valid = false
                }
            })
        }
        return valid
    }

    const addEdu= () => {
        let newList = [...newEducation.education, {edu_type: "", edu_degree: "", edu_school: "", edu_desc: ""}]
        let newEduDetails = {...newEducation, education: newList}
        setNewEducation(newEduDetails)
    };

    const removeEdu = () => {
    let newList = [...newEducation.education]
    let end = newList.length
    if (end > 0){
        newList.pop();
        let newEduDetails= {...newEducation, education: newList}
        setNewEducation(newEduDetails)
        }
    };

    const addExp= () => {
        let newList = [...newExperience.experience, {experience_name: "", experience_title: "", experience_start: "", experience_end: "", experience_desc: ""}]
        let newExpDetails = {...newExperience, experience: newList}
        setNewExperience(newExpDetails)
    };

    const removeExp = () => {
    let newList = [...newExperience.experience]
    let end = newList.length
    if (end > 0){
        newList.pop();
        let newExpDetails= {...newExperience, experience: newList}
        setNewExperience(newExpDetails)
        }
    };


    const goBack = () => {
        navigate(-1)
    }
    

    return (
        <div className='create-profile-page'>
            <div className='create-profile-heading'>
                <div>Create Profile</div>
            </div>
            <div className='create-profile-body'>
            <div className='create-profile-title'>More Details</div>
                <form onSubmit={submitHandler}>
                    <div className='create-profile-form'>
                        <div className='create-profile-title'>Education</div>
                            <div className='create-profile-section'>
                            {newEducation.education.map((_edu, index) => (
                                <div key={index}>
                                    <div className='inline-create'>
                                        <label htmlFor="edu_type">Level</label>
                                        <input onChange={(e) => newEducation.education[index]["edu_type"] = e.target.value} type="text" placeholder='e.g. BSc'/>
                                        <label htmlFor="edu_degree">Degree Name</label>
                                        <input onChange={(e) => newEducation.education[index]["edu_degree"] = e.target.value} type="text"/>
                                    </div>
                                    <div className='inline-create'>
                                        <label htmlFor="edu_school">School/College</label>
                                        <input onChange={(e) => newEducation.education[index]["edu_school"] = e.target.value} type="text"/>
                                    </div>
                                    <div className='inline-create'>
                                        <label htmlFor="edu_school">Brief description of course</label>
                                        <textarea rows="7" cols="80" onChange={(e) => newEducation.education[index]["edu_desc"] = (e.target.value).toString()} type="text" max='300'/>
                                    </div>
                                </div>
                            ))}
                        <div className='button-group'>
                            <button type="button" onClick={addEdu} style={{"backgroundColor": "green"}}>
                                Add another education +
                            </button>
                            {newEducation.education.length > 0 && (
                            <button type="button" className="but-neg" onClick={removeEdu} style={{"backgroundColor": "red"}}>
                                Remove education - 
                            </button>
                            )}
                        </div>
                    </div>
                    <div className='create-profile-title'>Previous Work Experience</div>
                        <div className='create-profile-section'>
                            {newExperience.experience.map((_exp, index) => (
                                <div key={index}>
                                    <div className='inline-create'>
                                        <label htmlFor="experience_name">Company</label>
                                        <input onChange={(e) => newExperience.experience[index]["experience_name"] = e.target.value} type="text" />
                                        <label htmlFor="experience_title">Your title</label>
                                        <input onChange={(e) => newExperience.experience[index]["experience_title"] = e.target.value} type="text"/>
                                    </div>
                                    <div className='inline-create'>
                                        <label htmlFor="experience_start">Start date</label>
                                        <input onChange={(e) => newExperience.experience[index]["experience_start"] = e.target.value} type="date"/>
                                        <label htmlFor="experience_end">End date</label>
                                        <input onChange={(e) => newExperience.experience[index]["experience_end"] = e.target.value} type="date"/>
                                    </div>
                                    <div className='inline-create'>
                                        <label htmlFor="experience_desc">Brief description of work done during experience</label>
                                        <textarea rows="7" cols="80" onChange={(e) => newExperience.experience[index]["experience_desc"] = (e.target.value).toString()} type="text" max="500"/>
                                    </div>
                                </div>
                            ))}
                            <div className='button-group'>
                                <button type="button" className="but-pos" onClick={addExp} style={{"backgroundColor": "green"}}>
                                    Add another work experience +
                                </button>
                                {newExperience.experience.length > 0 && (
                                    <button type="button" className="but-neg" onClick={removeExp} style={{"backgroundColor": "red"}}>
                                        Remove work experience - 
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className='button-group'>
                            <button type="button" onClick={goBack} style={{"backgroundColor": "darkblue"}}>
                                Back
                            </button>
                            <button type="submit" >
                                Next
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default MoreDetails;