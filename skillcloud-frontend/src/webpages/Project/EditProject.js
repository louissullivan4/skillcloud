import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Sidebar from "../../components/Sidebar";

import "../../index.css";

const EditProfile = () => {
    let location = useLocation()
    let navigate = useNavigate()
    let project_id = location.state.id
    const [projectData, setProjectData] = useState(location.state.details);
    const [roles, setRoles] = useState(location.state.details.roles);
    const [finalInfo, setFinalInfo] = useState();

    const sendData = async () => {
        const resp = await fetch(`http://127.0.0.1:5000/updateproject`,{'method':'POST', headers : {'Content-Type':'application/json'}, body: JSON.stringify(finalInfo)})
        const data = await resp.json();        
        return data
      };

      const event_match = async (newData) => {
        const resp = await fetch(`http://127.0.0.1:5000/eventmatch`,{'method':'POST', headers : {'Content-Type':'application/json'}, body: JSON.stringify(newData)})
        if (resp.status === 200) {
            alert("Project created successfully");
            // navigate('/project/' + project_id);
        } else {
            alert("Project creation failed. Please try again.");
        }
      };


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (projectData.author === localStorage.getItem('email')) {
            setFinalInfo({...projectData, roles: roles})
            let newData = await sendData()
            alert("The project will now be created, you will be notified when creation has been completed. Please free to continue using the site.");
            navigate('/home')
            event_match(newData)
        } else {
            // navigate('/')
        }
    }

    const addRole = () => {
        setRoles([...roles, {role_category: "", role_desc: "", role_no_needed: "", role_remote: "", role_title: ""}])
    };

    const removeRole = () => {
        let end = roles.length
        if (end > 1){
            roles.pop();
            setRoles([...roles])
        }
    };
    
    return (
        <div className="app">
            <Sidebar/>
            <div className="project">
                <div className="project-heading">
                    <h1 className="project-heading-title">Edit Project</h1>
                </div>
                <div className="project-body">
                    <form>
                        <div className="create-project">
                            <label htmlFor="title">Project Title</label>
                            <input type="text"  id="title" placeholder={projectData.title} defaultValue={projectData.title} onChange={(e) => setProjectData({...projectData, title: e.target.value})}/>
                            <div className='inline-create'>
                                <label htmlFor="start_date">Start Date</label>
                                <input type="date"  id="start_date" placeholder={projectData.start_date} defaultValue={projectData.start_date} onChange={(e) => setProjectData({...projectData, start_date: e.target.value})}/>
                                <label htmlFor="end_date">End Date</label>
                                <input type="date"  id="end_date" placeholder={projectData.end_date} defaultValue={projectData.end_date} onChange={(e) => setProjectData({...projectData, end_date: e.target.value})}/>
                            </div>
                            <div className='inline-create'>
                                <label htmlFor="city">City</label>
                                <input type="text"  id="city" placeholder={projectData.city} defaultValue={projectData.city} onChange={(e) => setProjectData({...projectData, city: e.target.value})}/>
                                <label htmlFor="country">Country</label>
                                <input type="text"  id="country" placeholder={projectData.country} defaultValue={projectData.country} onChange={(e) => setProjectData({...projectData, country: e.target.value})}/>

                            </div>
                            <label htmlFor="summary">Project Summary</label>
                            <textarea type="text" rows="5" cols="33" id="summary" placeholder={projectData.summary} defaultValue={projectData.summary} onChange={(e) => setProjectData({...projectData, summary: e.target.value})}/>
                        </div>
                        <div className="create-body-roles">
                            <h2>Roles</h2>
                            <div className="create-body-roles-header">
                                <label className='input-role-title'>Role Title</label>
                                <label className='input-role-desc'>Role Description</label>
                                <label className='input-role-category'>Role Category</label>
                                <label className='input-role-remote'>Is the role remote?</label>
                                <label className='input-role-no'>Number Needed</label>
                            </div>
                        <div className='create-body-roles-body'>
                            {roles.map((role, index) => (
                                <div key={index}>
                                    <input className='input-role-title' type="text" onChange={e => roles[index].role_title = e.target.value} placeholder={role.role_title} defaultValue={role.role_title}/>
                                    <input className='input-role-desc' type="text" onChange={e => roles[index].role_desc = e.target.value} placeholder={role.role_desc} defaultValue={role.role_desc}/>
                                    <select className="input-role-category" onChange={e => roles[index].role_category= e.target.value}>
                                    <option disabled selected>Select a role category...</option>
                                    {/*The following occupation list is an adaptation of a list created by
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
                                    <select className="input-role-remote" onChange={e => roles[index].role_remote = e.target.value}>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </select>
                                    <input className="input-role-no" type="number" onChange={e => roles[index].role_no_needed = e.target.value} placeholder={role.role_no_needed} min="1" max="100" defaultValue={role.role_no_needed}/>
                                </div>
                            ))} 
                        </div>
                            <div className="buttons-add-remove">
                                <button type="button" onClick={addRole} style={{"backgroundColor": "green"}}>
                                    Add another role +
                                </button>
                                {roles.length > 1 && (
                                    <button type="button" onClick={removeRole} style={{"backgroundColor": "red"}}>
                                        Remove role - 
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" onClick={handleSubmit} style={{"margin": "0.5em"}}>
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