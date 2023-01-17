import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Sidebar from "../../components/Sidebar";

import "../../index.css";

const EditProfile = () => {
    let location = useLocation()
    let navigate = useNavigate()
    const [userData, setUserData] = useState(location.state.details);
    const [education, setEducation] = useState(location.state.details.education);
    const [experience, setExperience] = useState(location.state.details.work_experience);
    const [certs, setCerts] = useState(location.state.details.certifications);      

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (userData.email === localStorage.getItem('email')) {
            let finalInfo = {...userData, education: education, work_experience: experience, certifications: certs, email: userData.email}
            const resp = await fetch(`http://127.0.0.1:5000/updateuser`,{'method':'POST', headers : {'Content-Type':'application/json'}, body: JSON.stringify(finalInfo)})
            if (resp.status === 200) {
                alert("User updated successfully");
                navigate('/profile/'+userData.email);
            } else {
                alert("User update failed. Please try again.");
            }
        } else {
            navigate('/')
        }
    }
    
    const addCert = () => {
        setCerts([...certs, {certName: ""}])
    };

    const removeCert = () => {
        let end = certs.length
        if (end > 1){
            certs.pop();
            setCerts([...certs])
        }
    };

    const addEducation = () => {
        setEducation([...education, {edu_type: "", edu_degree: "", edu_school: "", edu_desc: ""}])
    };

    const removeEducation = () => {
        let end = education.length
        if (end > 1){
            education.pop();
            setEducation([...education])
        }
    };

    const addExp = () => {
        setExperience([...experience, {experience_name: "", experience_title: "", experience_start: "", experience_end: "", experience_desc: ""}])
    };

    const removeExp = () => {
        let end = experience.length
        if (end > 1){
            experience.pop();
            setExperience([...experience])
        }
    };
    
    return (
        <div className="app">
            <Sidebar/>
            <div className="page">
                <div className="page-header">
                    <h1 className="page-title">Edit Profile</h1>
                </div>
                <div className="page-content">
                    <form>
                        <div className="form-group">
                            <label htmlFor="fname">First Name</label>
                            <input type="text"  id="fname" placeholder={userData.fname} defaultValue={userData.fname} onChange={(e) => setUserData({...userData, fname: e.target.value})}/>
                            <label htmlFor="lname">Last Name</label>
                            <input type="text"  id="lname" placeholder={userData.lname} defaultValue={userData.lname} onChange={(e) => setUserData({...userData, lname: e.target.value})}/>
                            <label htmlFor="city">City</label>
                            <input type="text"  id="city" placeholder={userData.city} defaultValue={userData.city} onChange={(e) => setUserData({...userData, city: e.target.value})}/>
                            <label htmlFor="country">Country</label>
                            <input type="text"  id="country" placeholder={userData.country} defaultValue={userData.country} onChange={(e) => setUserData({...userData, country: e.target.value})}/>
                            <label htmlFor="job_title">Job Title</label>
                            <input type="text"  id="job_title" placeholder={userData.job_title} defaultValue={userData.job_title} onChange={(e) => setUserData({...userData, job_title: e.target.value})}/>
                            <label htmlFor="job_desc">Job Description</label>
                            <input type="text"  id="job_desc" placeholder={userData.job_desc} defaultValue={userData.job_desc} onChange={(e) => setUserData({...userData, job_desc: e.target.value})}/>
                            <label htmlFor="category">Job Category</label>
                            <select id="job_category" onChange={(e) => setUserData({...userData, job_category: e.target.value})}>
                                <option>Select a role category...</option>
                                <option>Acting, Music and other Creative Arts</option>
                                <option>Agricultural, forestry and fishery labourers</option>
                                <option>Business and administration professionals</option>
                                <option>Food preparation</option>
                                <option>Information and communications technology</option>
                                <option>Health professionals</option>
                                <option>Hospitality, retail and other services</option>
                                <option>Labourers in mining, manufacturing and transport</option>
                                <option>Legal, social and cultural professionals</option>
                                <option>Personal service workers</option>
                                <option>Sciences and engineering</option>
                                <option>Security and Defense Workers</option>
                                <option>Teaching professionals</option>
                                <option>Trades workers, construction, electrical and other related</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                        <label htmlFor="certifications">Certifications</label>
                            {certs.map((cert, index) => (
                                <div key={index}>
                                    <input type="text" onChange={e => setCerts.certs[index] = e.target.value} placeholder={cert.certName} defaultValue={cert.certName}/>
                                </div>
                            ))} 
                            <button type="button" onClick={addCert}>
                                Add another certification +
                            </button>
                            {certs.length > 1 && (
                                <button type="button" onClick={removeCert}>
                                    Remove certification - 
                                </button>
                            )}
                        </div>
                        <div className="form-group">
                        <label htmlFor="education">Education</label>
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <div>
                                        <input type="text" onChange={e => setEducation.edu_type[index] = e.target.value} placeholder={edu.edu_type} defaultValue={edu.edu_type}/>
                                    </div>
                                    <div>
                                        <input type="text" onChange={e => setEducation.edu_degree[index] = e.target.value} placeholder={edu.edu_degree} defaultValue={edu.edu_degree}/>
                                    </div>
                                    <div>
                                        <input type="text" onChange={e => setEducation.edu_school[index] = e.target.value} placeholder={edu.edu_school} defaultValue={edu.edu_school}/>
                                    </div>
                                    <div>
                                        <input type="text" onChange={e => setEducation.edu_desc[index] = e.target.value} placeholder={edu.edu_desc} defaultValue={edu.edu_desc}/>
                                    </div>
                                </div>
                            ))} 
                            <button type="button" onClick={addEducation}>
                                Add another education +
                            </button>
                            {education.length > 1 && (
                                <button type="button" onClick={removeEducation}>
                                    Remove education - 
                                </button>
                            )}
                        </div>
                        <div className="form-group">
                        <label htmlFor="work_experience">Work Experience</label>
                            {experience.map((exp, index) => (
                                <div key={index}>
                                    <div>
                                        <input type="text" onChange={e => setExperience.experience_name[index] = e.target.value} placeholder={exp.experience_name} defaultValue={exp.experience_name}/>
                                    </div>
                                    <div>
                                        <input type="text" onChange={e => setExperience.experience_title[index] = e.target.value} placeholder={exp.experience_title} defaultValue={exp.experience_title}/>
                                    </div>
                                    <div>
                                        <input type="date" onChange={e => setExperience.experience_start[index] = e.target.value} placeholder={exp.experience_start} defaultValue={exp.experience_start}/>
                                    </div>
                                    <div>
                                        <input type="date" onChange={e => setExperience.experience_end[index] = e.target.value} placeholder={exp.experience_end} defaultValue={exp.experience_end}/>
                                    </div>
                                    <div>
                                        <input type="text" onChange={e => setExperience.experience_desc[index] = e.target.value} placeholder={exp.experience_desc} defaultValue={exp.experience_desc}/>
                                    </div>
                                </div>
                            ))} 
                            <button type="button" onClick={addExp}>
                                Add another work experience +
                            </button>
                            {experience.length > 1 && (
                                <button type="button" onClick={removeExp}>
                                    Remove work experience - 
                                </button>
                            )}
                        </div>
                        <div className="form-group">
                            <button type="submit" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default EditProfile;