import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BeatLoader from 'react-spinners/BeatLoader'

import "../../index.css";

const ProjectForm = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('email');
    const [spinner, setSpinner] = useState(false); 
    const [projectDetails, setProjectDetails] = useState(
        {roles: [{ 
        role_category: "",
        role_title: "",
        role_desc: "",
        role_no_needed: "",
        role_remote: ""
        },]}
    );


    const sendData = async () => {
        setSpinner(true);
        const resp = await fetch(`http://127.0.0.1:5000/createproject`,{'method':'POST', headers : {'Content-Type':'application/json'}, body: JSON.stringify(projectDetails)})
        .then(setSpinner(false));
        if (resp.status === 200) {
            alert("Project created successfully");
            // navigate('/home');
        } else {
            alert("Project creation failed. Please try again.");
        }
      };

    
    useEffect(() => {
        const authorAdd = {...projectDetails, project_author: user}
        setProjectDetails(authorAdd)
    }, []);

    const validateForm = () => {
        let valid = true;
        let message = "";
        let start = new Date(projectDetails.project_startdate);
        let end = new Date(projectDetails.project_enddate);
        if (projectDetails.project_title === "" || projectDetails.project_summary === "" || projectDetails.project_startdate === "" || projectDetails.project_enddate === "" || projectDetails.project_author === ""|| projectDetails.project_city === ""|| projectDetails.project_country === "") {
            valid = false;
            message = "Error! Please fill in all required fields";
        } else if (start > end) {
            valid = false;
            message = "Error! Please choose a start date before the entered end date.";
        }
        projectDetails.roles.forEach((role) => {
            if (role.role_category === "" || role.role_title === "" || role.role_desc === "" || role.role_no_needed === "" || role.role_category === "Select a role category..." || role.role_category < 1 || role.role_remote === "") {
                valid = false;
                message = "Error! Please fill in all required fields";
            }
        })
        return [valid, message]
    }

    const submitHandler = (e) => {        
        e.preventDefault()
        let validated = validateForm()
        if (validated[0]) {
            sendData()
            navigate('/home')
        } else {
            alert(validated[1])
        }
    };

    const addRole = () => {
        let newList = [...projectDetails.roles, {role_category: "", role_title: "", role_desc: "", role_no_needed: "", role_remote: ""}]
        let newProjectDetails = {...projectDetails, roles: newList}
        setProjectDetails(newProjectDetails)
    };

    const removeRole = () => {
    let newList = [...projectDetails.roles]
    let end = newList.length
    if (end > 1){
        newList.pop();
        let newProjectDetails = {...projectDetails, roles: newList}
        setProjectDetails(newProjectDetails)
        }
    };
    return (
        ( spinner === true ? 
            <BeatLoader color="#36d7b7" /> :
            <form onSubmit={submitHandler}>
                <div className="create-project">
                    <label htmlFor="title">Project Title</label>
                    <input type="text" maxLength={"100"} placeholder="Enter project title..." onChange={(e) => setProjectDetails({...projectDetails, project_title: e.target.value})}/>
                    <div className='inline-create'>
                        <label htmlFor="startdate">Start Date</label>
                        <input type="date" onChange={(e) => setProjectDetails({...projectDetails, project_startdate: e.target.value})}/>
                        <label htmlFor="enddate">End Date</label>
                        <input type="date" onChange={(e) => setProjectDetails({...projectDetails, project_enddate: e.target.value})}/>
                    </div>
                    <div className='inline-create'>
                        <label htmlFor="city">City</label>
                        <input type="text" onChange={(e) => setProjectDetails({...projectDetails, project_city: e.target.value})}/>
                        <label htmlFor="country">Country</label>
                        <input type="text" onChange={(e) => setProjectDetails({...projectDetails, project_country: e.target.value})}/>
                    </div>
                    <label htmlFor="projectsum">Project Summary</label>
                    <textarea type="text" rows="5" cols="33" placeholder="Enter project summary..." onChange={(e) => setProjectDetails({...projectDetails, project_summary: e.target.value})}/>
                </div>
                <div className="create-body-roles">
                    <h2>Roles Needed</h2>
                    <div className="create-body-roles-header">
                        <label className='input-role-title'>Role Title</label>
                        <label className='input-role-desc'>Role Description</label>
                        <label className='input-role-category'>Role Category</label>
                        <label className='input-role-remote'>Is the role remote?</label>
                        <label className='input-role-no'>Number Needed</label>
                    </div>
                    <div className='create-body-roles-body'>
                        {projectDetails.roles.map((_role, index) => (
                            <div key={index}>
                                <input
                                    className='input-role-title'
                                    type="text" 
                                    placeholder="Enter role title"
                                    onChange={e => projectDetails.roles[index]["role_title"] = e.target.value}/>
                                <input
                                    className='input-role-desc'
                                    type="text" 
                                    placeholder="Enter a detailed role description" 
                                    onChange={e => projectDetails.roles[index]["role_desc"] = e.target.value}/>
                                <select className="input-role-category" onChange={e => projectDetails.roles[index]["role_category"] = e.target.value}>
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
                                <select className="input-role-remote" onChange={e => projectDetails.roles[index]["role_remote"] = e.target.value}>
                                    <option>Select...</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                                <input
                                className="input-role-no"
                                type="number" 
                                placeholder="1" 
                                min='1'
                                max='100'   
                                onChange={e => projectDetails.roles[index]["role_no_needed"] = e.target.value}/>
                            </div>
                        ))}
                </div>
                <div className="buttons-add-remove">
                    <button type="button" onClick={addRole} style={{"backgroundColor": "green"}}>
                        Add another role +
                    </button>
                    {projectDetails.roles.length > 1 && (
                        <button type="button" onClick={removeRole} style={{"backgroundColor": "red"}}>
                            Remove role - 
                        </button>
                    )}
                </div>
                </div>
                <button type="submit" style={{"margin": "0.5em"}}>
                    Create
                </button> 
            </form>
        )
    )
}


export default ProjectForm;