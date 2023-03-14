import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Sidebar from "../../components/Sidebar";
import "../../index.css";

const ApplyForm = () => {
    const location = useLocation()
    let navigate = useNavigate();
    let email = localStorage.getItem("email")
    const [projectData, setProjectData] = useState(location.state)
    const [selectedRole, setSelectedRole] = useState("")
    
    console.log(location.state)

    const applySubmit = async(e) => {
        e.preventDefault()
        console.log(selectedRole)
        if (selectedRole === "" || selectedRole === "Select a role below:") {
            window.alert("Error! Please select a role to apply for.")
        } else {
            if (window.confirm("Are you sure you want to apply for the role?")) {
                const resp = await fetch('http://localhost:5000/applyproject/'+email+"/"+selectedRole)
                if (resp.status === 200) {
                    window.alert("You have successfully applied for this role!")
                    navigate('/home')
                } else {
                    window.alert("An error occurred while applying for this role. Please try again later.")
                    navigate('/home')
                }
            }
        }
    }

    return (
        <div className="app">
      <Sidebar/>
      <div className="project">
        <div className="project-heading">
          <div className="project-heading-title">
            <div className="project-button">
              <h1>Project Application Form</h1>
            </div>
          </div>
        </div>
        <div className="project-body">
            <h2>{projectData.title} - Roles</h2>
          <div className="project-body-roles">
              <table>
                <thead>
                  <tr>
                    <th width="20%">Title</th>
                    <th width="40%">Role Description</th>
                  </tr>
                </thead>
                <tbody>
                {projectData.roles?.map(
                (roleData, k) => (
                    <tr key={k}>
                      <td width="20%">{roleData.role_title}</td>
                      <td width="40%" className="role_desc">{roleData.role_desc}</td>
                    </tr>
                ))}
                </tbody>
              </table>
          </div>
            <form className='apply-form'>
                <h2>Complete Form</h2>
                <select className="apply-roles" onChange={(e) => setSelectedRole(e.target.value)}>
                <option className="apply-option" value="">Select a role below:</option>
                {projectData.roles?.map(
                (roleData, k) => (
                    <option key={k} className="apply-option" value={roleData.role_id}>{roleData.role_title}</option>
                ))}
                </select>
                <button type="submit" className='apply-button' onClick={applySubmit}>Apply</button>
            </form>
          </div>
        </div>
      </div>
    )
}
export default ApplyForm;
