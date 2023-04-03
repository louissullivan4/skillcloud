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

    const handleSubmit = async (e) => {
        e.preventDefault()
        await updateProfilePic(photo)
        if (userData.email === localStorage.getItem('email')) {
            let finalInfo = {...userData, education: education, work_experience: experience, certifications: certs, email: userData.email}
            console.log(finalInfo)
            fetch(`http://scbackend-env.eba-imjep3am.eu-north-1.elasticbeanstalk.com/updateuser`,{'method':'POST', headers : {'Content-Type':'application/json'}, body: JSON.stringify(finalInfo)})
            .then(() => { alert("User updated successfully");
            })
            alert("User is being updated. You can continue to use the site in the mean time.")
            navigate('/profile/'+userData.email);
        } else {
            alert("Error occurred updating user.")
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
                <div className="edit-body">
                    <form>
                        <div className="create-project">
                            <div className="edit-profile">
                                <label htmlFor="file">Profile Image</label>
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
                            <label htmlFor="job_category">Job Category</label>
                            <select id="job_category" onChange={(e) => setUserData({...userData, job_category: e.target.value})}>
                            <option disabled selected>Select a role category...</option>
                            <option disabled selected>Select a role category...</option>
                                    {/*The following occupation list was created by 
                                    McKenna,J (2017) occupation-dropdown.html[Source Code]. https://gist.github.com/ag14spirit/fbf877576c9d6b78899e3ad02fe92b50*/}
                                    <optgroup label="Healthcare Practitioners and Technical Occupations:">
                                        <option>-  Dentist</option>
                                        <option>-  Dietitian or Nutritionist</option>
                                        <option>-  Optometrist</option>
                                        <option>-  Pharmacist</option>
                                        <option>-  Physician</option>
                                        <option>-  Physician Assistant</option>
                                        <option>-  Podiatrist</option>
                                        <option>-  Registered Nurse</option>
                                        <option>-  Therapist</option>
                                        <option>-  Veterinarian</option>
                                        <option>-  Health Technologist or Technician</option>
                                        <option>-  Other Healthcare Practitioners and Technical Occupation</option>
                                        </optgroup>
                                        <optgroup label="Healthcare Support Occupations:">
                                        <option>-  Nursing, Psychiatric, or Home Health Aide</option>
                                        <option>-  Occupational and Physical Therapist Assistant or Aide</option>
                                        <option>-  Other Healthcare Support Occupation</option>
                                        </optgroup>
                                        <optgroup label="Business, Executive, Management, and Financial Occupations:">
                                        <option>-  Chief Executive</option>
                                        <option>-  General and Operations Manager</option>
                                        <option>-  Advertising, Marketing, Promotions, Public Relations, and Sales Manager</option>
                                        <option>-  Operations Specialties Manager (e.g., IT or HR Manager)</option>
                                        <option>-  Construction Manager</option>
                                        <option>-  Engineering Manager</option>
                                        <option>-  Accountant, Auditor</option>
                                        <option>-  Business Operations or Financial Specialist</option>
                                        <option>-  Business Owner</option>
                                        <option>-  Other Business, Executive, Management, Financial Occupation</option>
                                        </optgroup>
                                        <optgroup label="Information Technology and Communication Occupations:">
                                        <option>-  Software Engineer, Full Stack Developer, Programmer, Web Developer</option>
                                        <option>-  QA Tester, Test Analyst</option>
                                        <option>-  UX Designer</option>
                                        <option>-  Database Administrator, Database Analyst</option>
                                        <option>-  Network Engineer, Network Administrator</option>
                                        <option>-  Systems Administrator, Systems Analyst, Systems Engineer</option>
                                        <option>-  IT Consultant, IT Manager</option>
                                        <option>-  Tech Support</option>
                                        <option>-  Other Architecture and Engineering Occupation</option>
                                        </optgroup>
                                        <optgroup label="Engineering Occupations:">
                                        <option>-  Architect, Surveyor, or Cartographer</option>
                                        <option>-  Chemical Engineer</option>
                                        <option>-  Industrial Engineer</option>
                                        <option>-  Manufacturing Engineer</option>
                                        <option>-  Environmental Engineer</option>
                                        <option>-  Biomedical engineer</option>
                                        <option>-  Civil engineer</option>
                                        <option>-  Electrical engineer</option>
                                        <option>-  Mechanical engineer</option>
                                        <option>-  Other Engineering Occupation</option>
                                        </optgroup>
                                        <optgroup label="Education, Training, and Library Occupations:">
                                        <option>-  Postsecondary Teacher (e.g., College Professor)</option>
                                        <option>-  Primary School Teacher</option>
                                        <option>-  Secondary Education School Teacher</option>
                                        <option>-  Special Education School Teacher</option>
                                        <option>-  Other Teacher or Instructor</option>
                                        <option>-  Other Education, Training, and Library Occupation</option>
                                        </optgroup>
                                        <optgroup label="Other Professional Occupations:">
                                        <option>-  Arts, Design, Entertainment, Sports, and Media Occupations</option>
                                        <option>-  Content Creator, Social Media Influencer, Professional e-sports Player</option>
                                        <option>-  Mathematical Science</option>
                                        <option>-  Counselor, Social Worker, or Other Community and Social Service Specialist</option>
                                        <option>-  Lawyer, Judge</option>
                                        <option>-  Life Scientist (e.g., Animal, Food, Soil, or Biological Scientist, Zoologist)</option>
                                        <option>-  Physical Scientist (e.g., Astronomer, Physicist, Chemist, Hydrologist)</option>
                                        <option>-  Religious Worker (e.g., Clergy, Director of Religious Activities or Education)</option>
                                        <option>-  Social Scientist and Related Worker</option>
                                        <option>-  Other Professional Occupation</option>
                                        </optgroup>
                                        <optgroup label="Office and Administrative Support Occupations:">
                                        <option>-  Supervisor of Administrative Support Workers</option>
                                        <option>-  Financial Clerk</option>
                                        <option>-  Secretary or Administrative Assistant</option>
                                        <option>-  Material Recording, Scheduling, and Dispatching Worker</option>
                                        <option>-  Other Office and Administrative Support Occupation</option>
                                        </optgroup>
                                        <optgroup label="Services Occupations:">
                                        <option>-  Protective Service (e.g., Fire Fighting, Police Officer, Correctional Officer)</option>
                                        <option>-  Chef or Head Cook</option>
                                        <option>-  Cook or Food Preparation Worker</option>
                                        <option>-  Food and Beverage Serving Worker (e.g., Bartender, Waiter, Waitress)</option>
                                        <option>-  Building and Grounds Cleaning and Maintenance</option>
                                        <option>-  Personal Care and Service (e.g., Hairdresser, Flight Attendant, Concierge)</option>
                                        <option>-  Sales Supervisor, Retail Sales</option>
                                        <option>-  Retail Sales Worker</option>
                                        <option>-  Insurance Sales Agent</option>
                                        <option>-  Sales Representative</option>
                                        <option>-  Real Estate Sales Agent</option>
                                        <option>-  Other Services Occupation</option>
                                        </optgroup>
                                        <optgroup label="Agriculture, Architecture, Maintenance, Repair, and Skilled Crafts Occupations:">
                                        <option>-  Construction and Extraction (e.g., Construction Laborer, Carpenter, Electrician)</option>
                                        <option>-  Farming, Fishing, and Forestry</option>
                                        <option>-  Installation, Maintenance, and Repair</option>
                                        <option>-  Production Occupations</option>
                                        <option>-  Other Agriculture, Architecture, Maintenance, Repair, and Skilled Crafts Occupation</option>
                                        </optgroup>
                                        <optgroup label="Transportation Occupations:">
                                        <option>-  Aircraft Pilot or Flight Engineer</option>
                                        <option>-  Motor Vehicle Operator (e.g., Ambulance, Bus, Taxi, or Truck Driver)</option>
                                        <option>-  Other Transportation Occupation</option>
                                        </optgroup>
                                        <optgroup label="Other Occupations:">
                                        <option>-  Military</option>
                                        <option>-  Homemaker</option>
                                        <option>-  Other Occupation</option>
                                        </optgroup>
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