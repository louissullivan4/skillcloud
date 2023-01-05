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
        experience: [{
            experience_name: "",
            experience_title: "",
            experience_start: "",
            experience_end: "",
            experience_desc: "",
        },]
    });
    console.log(state)
    const submitHandler = (e) => {
        e.preventDefault()
        let finalInfo = {...state, education: newEducation.education, experience: newExperience.experience}
        navigate('/acceptdetails', {state:{ ...finalInfo}})
    }

    const addEdu= () => {
        let newList = [...newEducation.education, {edu_type: "", edu_degree: "", edu_school: "", edu_desc: ""}]
        let newEduDetails = {...newEducation, education: newList}
        setNewEducation(newEduDetails)
    };

    const removeEdu = () => {
    let newList = [...newEducation.education]
    let end = newList.length
    if (end > 1){
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
    if (end > 1){
        newList.pop();
        let newExpDetails= {...newExperience, experience: newList}
        setNewExperience(newExpDetails)
        }
    };

    const goBack = () => {
        navigate(-1)
    }
    

    return (
        <div className="flex justify-center items-center h-screen bg-indigo-100">
            <div className="bg-white rounded shadow-2xl w-11/12 md:w-9/12 lg:w-1/2">
                <div className="text-center pt-6">Create Profile</div>
                <div className='header2'>More Details</div>
                <div className='body'>
                    <form onSubmit={submitHandler}>
                        <div className='header3'>Education</div>
                        {newEducation.education.map((_edu, index) => (
                            <div key={index}>
                                <div className="formVal">
                                    <label htmlFor="edu_type">Academic Degree</label>
                                    <input onChange={(e) => newEducation.education[index]["edu_type"] = e.target.value} type="text" placeholder='e.g. BSc'/>
                                    <label htmlFor="edu_degree">Degree Name</label>
                                    <input onChange={(e) => newEducation.education[index]["edu_degree"] = e.target.value} type="text"/>
                                    <label htmlFor="edu_school">School/College</label>
                                    <input onChange={(e) => newEducation.education[index]["edu_school"] = e.target.value} type="text"/>
                                    <label htmlFor="edu_school">Brief description of course</label>
                                    <input onChange={(e) => newEducation.education[index]["edu_desc"] = e.target.value} type="text" max='300'/>
                                </div>
                            </div>
                        )
                    )}
                    <div className='form-row'>
                        <button type="button" className="but-pos" onClick={addEdu}>
                            Add another education +
                        </button>
                    </div>
                    {newEducation.education.length > 1 && (
                        <div className='form-row'>
                            <button type="button" className="but-neg" onClick={removeEdu}>
                                Remove education - 
                            </button>
                        </div>
                    )}
                    <div className='header4'>Previous Work Experience</div>
                        {newExperience.experience.map((_exp, index) => (
                            <div key={index}>
                                <div className="formVal">
                                    <label htmlFor="experience_name">Workplace name</label> 0
                                    <input onChange={(e) => newExperience.experience[index]["experience_name"] = e.target.value} type="text" placeholder='e.g. BSc'/>
                                    <label htmlFor="experience_title">Your title during the experience</label>
                                    <input onChange={(e) => newExperience.experience[index]["experience_title"] = e.target.value} type="text"/>
                                    <label htmlFor="experience_start">Start date</label>
                                    <input onChange={(e) => newExperience.experience[index]["experience_start"] = e.target.value} type="date"/>
                                    <label htmlFor="experience_end">End date</label>
                                    <input onChange={(e) => newExperience.experience[index]["experience_end"] = e.target.value} type="date"/>
                                    <label htmlFor="experience_desc">Brief description of work done during experience</label>
                                    <input onChange={(e) => newExperience.experience[index]["experience_desc"] = e.target.value} type="text" max="500"/>
                                </div>
                            </div>
                        )
                    )}
                    <div className='form-row'>
                        <button type="button" className="but-pos" onClick={addExp}>
                            Add another work experience +
                        </button>
                    </div>
                    {newExperience.experience.length > 1 && (
                        <div className='form-row'>
                            <button type="button" className="but-neg" onClick={removeExp}>
                                Remove work experience - 
                            </button>
                        </div>
                    )}
                    <div className="formVal">
                            <button className="nextBut"  type="submit" >
                                Next
                            </button>
                        </div>
                    </form>
                    <button className="backBut" type="button" onClick={goBack}>
                                Back
                    </button>
                </div>
            </div>
        </div>
    );
}
export default MoreDetails;