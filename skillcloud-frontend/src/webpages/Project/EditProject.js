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
    console.log(roles)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (projectData.author === localStorage.getItem('email')) {
            let finalInfo = {...projectData, roles: roles}

            console.log(finalInfo)
            const resp = await fetch(`http://127.0.0.1:5000/updateproject`,{'method':'POST', headers : {'Content-Type':'application/json'}, body: JSON.stringify(finalInfo)})
            if (resp.status === 200) {
                alert("Project updated successfully");
                navigate('/project/' + project_id);
            } else {
                alert("Project update failed. Please try again.");
            }
        } else {
            navigate('/')
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
            <div className="page">
                <div className="page-header">
                    <h1 className="page-title">Edit Project</h1>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Project Title</label>
                        <input type="text"  id="title" placeholder={projectData.title} defaultValue={projectData.title} onChange={(e) => setProjectData({...projectData, title: e.target.value})}/>
                        <label htmlFor="start_date">Start Date</label>
                        <input type="date"  id="start_date" placeholder={projectData.start_date} defaultValue={projectData.start_date} onChange={(e) => setProjectData({...projectData, start_date: e.target.value})}/>
                        <label htmlFor="end_date">End Date</label>
                        <input type="date"  id="end_date" placeholder={projectData.end_date} defaultValue={projectData.end_date} onChange={(e) => setProjectData({...projectData, end_date: e.target.value})}/>
                        <label htmlFor="city">City</label>
                        <input type="text"  id="city" placeholder={projectData.city} defaultValue={projectData.city} onChange={(e) => setProjectData({...projectData, city: e.target.value})}/>
                        <label htmlFor="country">Country</label>
                        <input type="text"  id="country" placeholder={projectData.country} defaultValue={projectData.country} onChange={(e) => setProjectData({...projectData, country: e.target.value})}/>
                        <label htmlFor="summary">Project Summary</label>
                        <input type="text"  id="summary" placeholder={projectData.summary} defaultValue={projectData.summary} onChange={(e) => setProjectData({...projectData, summary: e.target.value})}/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="roles">Roles</label>
                        {roles.map((role, index) => (
                            <div key={index}>
                                <div>
                                    <input type="text" onChange={e => roles[index].role_title = e.target.value} placeholder={role.role_title} defaultValue={role.role_title}/>
                                </div>
                                <div>
                                    <input type="text" onChange={e => roles[index].role_desc = e.target.value} placeholder={role.role_desc} defaultValue={role.role_desc}/>
                                </div>
                                <div>
                                    <select onChange={e => roles[index] .role_category= e.target.value}>
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
                                <div>
                                    <select onChange={e => roles[index].role_remote = e.target.value}>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </select>
                                </div>
                                <div>
                                    <input type="number" onChange={e => roles[index].role_no_needed = e.target.value} placeholder={role.role_no_needed} min="1" max="100" defaultValue={role.role_no_needed}/>
                                </div>
                            </div>
                        ))} 
                        <button type="button" onClick={addRole}>
                            Add another role +
                        </button>
                        {roles.length > 1 && (
                            <button type="button" onClick={removeRole}>
                                Remove role - 
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
    );
}
export default EditProfile;