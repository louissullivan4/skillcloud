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
                                    <select className="input-role-category" onChange={e => roles[index] .role_category= e.target.value}>
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