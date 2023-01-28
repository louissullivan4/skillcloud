import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { UserAuth } from "../../context/AuthContext";

import Sidebar from "../../components/Sidebar";

import "../../index.css";

const EditProfile = () => {
    let location = useLocation()
    let navigate = useNavigate()
    const [userData, setUserData] = useState(location.state.details);
    const [education, setEducation] = useState(location.state.details.education);
    const [experience, setExperience] = useState(location.state.details.work_experience);
    const [certs, setCerts] = useState(location.state.details.certifications);      

    const { updateProfilePic, user } = UserAuth()
    const [photo, setPhoto] = useState("")

    function handleChange(e) {
        if (e.target.files[0]) {
          setPhoto(e.target.files[0])
        }
    }

    const getProfilePic = async () => {
        const storage = getStorage();
        const url = await getDownloadURL(ref(storage, `profile/${user.uid}`));
        setPhoto(url);
    }
    // getProfilePic();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await updateProfilePic(photo)
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
            <div className="project">
                <div className="project-heading">
                    <h1 className="project-heading-title">Edit Profile</h1>
                </div>
                <div className="project-body">
                    <form>
                        <div className="create-project">
                            <div className="edit-profile">
                                <label htmlFor="file">Profile Image</label>
                                <img src={photo} style={{"height": "130px", "width": "100px", "marginRight":"1.5em"}}/>
                                <input type="file" onChange={handleChange}/>
                            </div>
                            <label htmlFor="fname">First Name</label>
                            <input type="text"  id="fname" placeholder={userData.fname} defaultValue={userData.fname} onChange={(e) => setUserData({...userData, fname: e.target.value})}/>
                            <label htmlFor="lname">Last Name</label>
                            <input type="text"  id="lname" placeholder={userData.lname} defaultValue={userData.lname} onChange={(e) => setUserData({...userData, lname: e.target.value})}/>
                            <div className='inline-create'>
                                <label htmlFor="city">City</label>
                                <input type="text"  id="city" placeholder={userData.city} defaultValue={userData.city} onChange={(e) => setUserData({...userData, city: e.target.value})}/>
                                <label htmlFor="country">Country</label>
                                <input type="text"  id="country" placeholder={userData.country} defaultValue={userData.country} onChange={(e) => setUserData({...userData, country: e.target.value})}/>
                            </div>
                            <label htmlFor="job_title">Job Title</label>
                            <input type="text"  id="job_title" placeholder={userData.job_title} defaultValue={userData.job_title} onChange={(e) => setUserData({...userData, job_title: e.target.value})}/>
                            <label htmlFor="job_desc">Job Description</label>
                            <textarea rows="5" cols="33"  id="job_desc" placeholder={userData.job_desc} defaultValue={userData.job_desc} onChange={(e) => setUserData({...userData, job_desc: e.target.value})}/>
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
                        <div className="create-body-roles">
                        <h2 style={{"marginBottom": "0.4em"}}>Certifications</h2>
                            <div className='create-body-roles-body'>
                            {certs.map((cert, index) => (
                                <div key={index}>
                                    <input type="text" style={{"fontSize": "1em"}} onChange={e => certs[index].certName = e.target.value} placeholder={cert.certName} defaultValue={cert.certName}/>
                                </div>
                            ))} 
                            <div className="buttons-add-remove">
                                <button type="button" onClick={addCert} style={{"backgroundColor": "green"}}>
                                    Add another certification +
                                </button>
                                {certs.length > 1 && (
                                    <button type="button" onClick={removeCert} style={{"backgroundColor": "red"}}>
                                        Remove certification - 
                                    </button>
                                )}
                            </div>
                            </div>
                        </div>
                        <div className="create-body-roles">
                        <h2 style={{"marginBottom": "0.4em"}}>Education</h2>
                            {education.map((edu, index) => (
                                <div key={index} className="education-edit">
                                        <label htmlFor="edu_type">Education Type</label>
                                        <input type="text" onChange={e => education[index].edu_type = e.target.value} placeholder={edu.edu_type} defaultValue={edu.edu_type}/>
                                        <label htmlFor="edu_degree">Degree</label>
                                        <input type="text" onChange={e => education[index].edu_degree = e.target.value} placeholder={edu.edu_degree} defaultValue={edu.edu_degree}/>
                                        <label htmlFor="edu_school">College</label>
                                        <input type="text" onChange={e => education[index].edu_school = e.target.value} placeholder={edu.edu_school} defaultValue={edu.edu_school}/>
                                        <label htmlFor="edu_desc">Description of College modules</label>
                                        <textarea rows="5" cols="33" type="text" onChange={e => education[index].edu_desc = e.target.value} placeholder={edu.edu_desc} defaultValue={edu.edu_desc}/>
                                </div>
                            ))}
                            <div className="buttons-add-remove">
                                <button type="button" onClick={addEducation} style={{"backgroundColor": "green"}}>
                                    Add another education +
                                </button>
                                {education.length > 1 && (
                                    <button type="button" onClick={removeEducation} style={{"backgroundColor": "red"}}>
                                        Remove education - 
                                    </button>
                                )}        
                            </div>
                        </div>
                        <div className="create-body-roles">
                        <h2 style={{"marginBottom": "0.4em"}}>Work Experience</h2>
                            {experience.map((exp, index) => (
                                <div key={index} className="education-edit">
                                    <label htmlFor="experience_name">Company Name</label>
                                    <input type="text" onChange={e => experience[index].experience_name= e.target.value} placeholder={exp.experience_name} defaultValue={exp.experience_name}/>
                                    <label htmlFor="experience_title">Job Title</label>
                                    <input type="text" onChange={e => experience[index].experience_title = e.target.value} placeholder={exp.experience_title} defaultValue={exp.experience_title}/>
                                    <div className='inline-create'>
                                        <label htmlFor="experience_start">Start Date</label>
                                        <input type="date" onChange={e => experience[index].experience_start= e.target.value} placeholder={exp.experience_start} defaultValue={exp.experience_start}/>
                                        <label htmlFor="experience_end">End Date</label>
                                        <input type="date" onChange={e => experience[index].experience_end = e.target.value} placeholder={exp.experience_end} defaultValue={exp.experience_end}/>
                                    </div>
                                    <label htmlFor="experience_desc">Description of Job</label> 
                                    <textarea rows="5" cols="33" type="text" onChange={e => experience[index].experience_desc = e.target.value} placeholder={exp.experience_desc} defaultValue={exp.experience_desc}/>
                                </div>
                            ))} 
                            <div className="buttons-add-remove">
                                <button type="button" onClick={addExp} style={{"backgroundColor": "green"}}>
                                    Add another work experience +
                                </button>
                                {experience.length > 1 && (
                                    <button type="button" onClick={removeExp} style={{"backgroundColor": "red"}}>
                                        Remove work experience - 
                                    </button>
                                )}
                            </div>
                        </div>
                        <button type="submit" onClick={handleSubmit} style={{"margin": "0.5em"}}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default EditProfile;