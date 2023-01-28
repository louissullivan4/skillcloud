import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import Sidebar from "../../components/Sidebar";

function Project() {
    let projectId = useParams()
    const [projectData, setProjectData] = useState([]);
    let navigate = useNavigate();

    const handleClick = () =>{ 
        // make a poppup appear
        
    } 

    const handleEdit = () =>{
      if (window.confirm("You are about to edit this project. All previous roles fufilled by users will be deleted. Are you sure you want to continue?")) {
        navigate("/editproject", { state: { id: projectId.id, details: projectData} })
      }
    }
    
    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://127.0.0.1:5000/project/'+projectId.id)
        const data = await resp.json();
        setProjectData(data);
      };
      fetchData()
    }, []);

  return (
    <div className="app">
      <Sidebar/>
      <div className="project">
        <div className="project-heading">
          <div className="project-heading-title">
            <h1>{projectData.title}</h1>
            <div>#{projectData.id}</div>
            {projectData.state === 'Open' ? <div style={{color: "green"}}>State: {projectData.state}</div> : <div style={{color: "red"}}>State: {projectData.state}</div>}
          </div>
        </div>
        <div className="project-body">
          <div className="project-body-details">
            <div><b>Project Summary</b>: {projectData.summary}</div>
            <div><b>Start Date</b>: {projectData.start_date}</div>
            <div><b>End Date</b>: {projectData.end_date}</div>
            <div><b>Project Creator</b>:<Link to={`/profile/${projectData.author}`} style={{textDecoration: "none"}}> {projectData.author}</Link></div>
          </div>
          <div className="project-body-roles">
            <h2>Project Roles</h2>
              <table>
                <thead>
                  <tr>
                    <th width="20%">Title</th>
                    <th width="40%">Role Description</th>
                    <th width="10%">No. of People</th>
                    <th width="20%">Role Category</th>
                    <th width="10%">Role Remote</th>
                  </tr>
                </thead>
                <tbody>
                {projectData.roles?.map(
                (roleData, k) => (
                    <tr key={k}>
                      <td width="20%">{roleData.role_title}</td>
                      <td width="40%" className="role_desc">{roleData.role_desc}</td>
                      <td width="10%">{roleData.role_no_needed - roleData.roles_filled}</td>
                      <td width="20%">{roleData.role_category}</td>
                      <td width="10%">{roleData.role_remote}</td>
                    </tr>
                ))}
                </tbody>
              </table>
          </div>
          {localStorage.getItem("email") === projectData.author ? <button type="button" onClick={handleEdit}>Edit Project  </button> : projectData.state === 'Open' ? <button type="button" onClick={handleClick}>Apply Here  </button>: <div></div>}
          </div>
        </div>
      </div>
    )
  }
export default Project;