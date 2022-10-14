import React, { useEffect, useState } from 'react'

import "../index.css";

function ProjectForm() {
    localStorage.setItem("username", "test@gmail.com");
    const [userDetails, setUserDetails] = useState([]);

    const sendData = async () => {
        const resp = await fetch(`http://127.0.0.1:5000/createprofile`,{'method':'POST', headers : {'Content-Type':'application/json'}, body: JSON.stringify(userDetails)})
        if (resp.status === 200) {
            alert("Profile created successfully");
            window.location.reload(false);
        } else {
            alert("Profile creation failed. Please try again.");
        }
      };

    const submitHandler = (e) => {        
        e.preventDefault()
        console.log(userDetails)
    };

    return (
        <form onSubmit={submitHandler}>
            <div className='form-inner'>
                <div className='form-row'>
                    <div className='form-col'>
                        <div className='form-group'>
                            <label htmlFor="title">Email:</label>
                            <input type="text" placeholder="Enter email..." onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}/>
                        </div>
                    </div>
                    <div className='form-col'>
                        <div className='form-group'>
                            <label htmlFor="title">Password:</label>
                            <input type="text" placeholder="Enter password..." onChange={(e) => setUserDetails({...userDetails, password: e.target.value})}/>
                        </div>
                    </div>
                    <div className='form-col'>
                        <div className='form-group'>
                            <label htmlFor="title">Repeat Password:</label>
                            <input type="text" placeholder="Please repeat password..."/>
                        </div>
                    </div>
                </div>
                <div className='form-row'> 
                    <div className='form-col'>
                        <div className='form-group'>
                            <label htmlFor="title">First Name:</label>
                            <input type="text" placeholder="Enter first name..." onChange={(e) => setUserDetails({...userDetails, fname: e.target.value})}/>
                        </div>
                    </div>
                    <div className='form-col'>
                        <div className='form-group'>
                            <label htmlFor="startdate">Second Name:</label>
                            <input type="text" onChange={(e) => setUserDetails({...userDetails, lname: e.target.value})}/>
                        </div>
                    </div>
                    <div className='form-col'>
                        <div className='form-group'>
                            <label htmlFor="enddate">End Date</label>
                            <input type="date" onChange={(e) => setUserDetails({...userDetails, project_enddate: e.target.value})}/>
                        </div>
                    </div>
                </div>
                <div className='form-row'>
                    <div className='form-col'>
                        <div className='form-group'>
                            <label htmlFor="projectsum">Project Summary</label>
                            <input type="text" placeholder="Enter project summary..." onChange={(e) => setUserDetails({...userDetails, project_summary: e.target.value})}/>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}


export default ProjectForm;