import React, { useEffect, useState } from 'react'

import "../index.css";

function ProjectForm() {
    // const [user, setUser] = useState();
    localStorage.setItem("username", "test@gmail.com");
    // setUser("amy@gmail.com")
    const [projectDetails, setProjectDetails] = useState(
        {roles: [{ 
        role_category: "",
        role_title: "",
        role_desc: "",
        role_no_needed: "",
        },]}
    );

    const sendData = async () => {
        const resp = await fetch(`http://127.0.0.1:5000/createproject`,{'method':'POST', headers : {'Content-Type':'application/json'}, body: JSON.stringify(projectDetails)})
        if (resp.status === 200) {
            alert("Project created successfully");
            window.location.reload(false);
        } else {
            alert("Project creation failed. Please try again.");
        }
      };

    useEffect(() => {
        const authorAdd = {...projectDetails, project_author: "test@gmail.com"}
        setProjectDetails(authorAdd)
    }, []);

    const validateForm = () => {
        let valid = true;
        let message = "";
        let start = new Date(projectDetails.project_startdate);
        let end = new Date(projectDetails.project_enddate);
        console.log(start);
        console.log(end);
        console.log(projectDetails.start_date);
        if (projectDetails.project_title === "" || projectDetails.project_summary === "" || projectDetails.project_startdate === "" || projectDetails.project_enddate === "" || projectDetails.project_author === "") {
            valid = false;
            message = "Error! Please fill in all required fields";
        } else if (start > end) {
            valid = false;
            message = "Error! Please choose a start date before the entered end date.";
        }
        projectDetails.roles.forEach((role) => {
            if (role.role_category === "" || role.role_title === "" || role.role_desc === "" || role.role_no_needed === "" || role.role_category === "Select a role category..." || role.role_category < 1) {
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
        } else {
            alert(validated[1])
        }
    };

    const addRole = () => {
        let newList = [...projectDetails.roles, {role_category: "", role_title: "", role_desc: "", role_no_needed: ""}]
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
        <form onSubmit={submitHandler}>
            <div className='form-inner'>
                <div className='form-row'>
                    <div className='form-col'>
                        <div className='form-group'>
                            <label htmlFor="title">Project Title</label>
                            <input type="text" maxLength={"25"} placeholder="Enter project title..." onChange={(e) => setProjectDetails({...projectDetails, project_title: e.target.value})}/>
                        </div>
                    </div>
                    <div className='form-col'>
                        <div className='form-group'>
                            <label htmlFor="startdate">Start Date</label>
                            <input type="date" onChange={(e) => setProjectDetails({...projectDetails, project_startdate: e.target.value})}/>
                        </div>
                    </div>
                    <div className='form-col'>
                        <div className='form-group'>
                            <label htmlFor="enddate">End Date</label>
                            <input type="date" onChange={(e) => setProjectDetails({...projectDetails, project_enddate: e.target.value})}/>
                        </div>
                    </div>
                </div>
                <div className='form-row'>
                    <div className='form-col'>
                        <div className='form-group'>
                            <label htmlFor="projectsum">Project Summary</label>
                            <input type="text" placeholder="Enter project summary..." onChange={(e) => setProjectDetails({...projectDetails, project_summary: e.target.value})}/>
                        </div>
                    </div>
                </div>
                <h3>Roles Needed</h3>
                <div className='form-row'>
                    <div className='form-col'>
                        <label>Role Title</label>
                    </div>
                    <div className='form-col'>
                        <label>Role Description</label>
                    </div>
                    <div className='form-col'>
                        <label>Role Category</label>
                    </div>
                    <div className='form-col'>
                        <label>Role Count</label>
                    </div>
                </div>
                {projectDetails.roles.map((_role, index) => (
                <div className='form-row' key={index}>
                    <div className='form-col'>
                        <div className='form-group'>
                            <input
                                type="text" 
                                placeholder="Enter role title"
                                onChange={e => projectDetails.roles[index]["role_title"] = e.target.value}/>
                        </div>
                    </div>
                    <div className='form-col'>
                        <div className='form-group'>
                            <input
                                type="text" 
                                placeholder="Enter a detailed role description" 
                                onChange={e => projectDetails.roles[index]["role_desc"] = e.target.value}/>
                        </div>
                    </div>
                    <div className='form-col'>
                        <div className='form-group'>
                            <select onChange={e => projectDetails.roles[index]["role_category"] = e.target.value}>
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
                    </div>
                    <div className='form-col'>
                        <div className='form-group'>
                            <input
                            type="number" 
                            placeholder="1" 
                            min='1'
                            max='100'   
                            onChange={e => projectDetails.roles[index]["role_no_needed"] = e.target.value}/>
                        </div>
                    </div>
                </div>
                ))}
                <div className='form-row'>
                    <div className='form-col'>
                        <button type="button" className="but-pos" onClick={addRole}>
                            Add another role +
                        </button>
                    </div>
                    {projectDetails.roles.length > 1 && (
                        <div className='form-col'>
                            <button type="button" className="but-neg" onClick={removeRole}>
                                Remove role - 
                            </button>
                        </div>
                    )}
                </div>
                <div className='form-row'>
                    <div className='form-col'>
                        <button className="but-submit"  type="submit" >
                            Create
                        </button> 
                    </div>
                </div>
            </div>
        </form>
    );
}


export default ProjectForm;