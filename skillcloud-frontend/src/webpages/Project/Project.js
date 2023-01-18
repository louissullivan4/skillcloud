import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";

function Project() {
    let projectId = useParams()
    const [projectData, setProjectData] = useState([]);
    let navigate = useNavigate();

    const handleClick = () =>{ 
        // let path = `/`; 
        // navigate(path);
        console.log("Apply button clicked")
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
      <div className="project-page">
          <div className="project-page-heading">
            <div className="project-page-title">
              <h1>{projectData.title}</h1>
              <div>#{projectData.id}</div>
            </div>
            {projectData.state === 'Open' ? <button type="button" onClick={handleClick}>Apply Here  </button> : <div></div>}
            {localStorage.getItem("email") === projectData.author ? <button type="button" onClick={handleEdit}>Edit Project  </button> : <div></div>}
          </div>
            <div className='project'>
                  <div className='project-body'>
                  <div className='project-text'>Project Summary: {projectData.summary}</div>
                  <div className='project-text'>Start Date: {projectData.start_date}</div>
                  <div className='project-text'>End Date: {projectData.end_date}</div>
                  <div className='project-text'>Project Creator: {projectData.author}</div>
                    <h2>Project Roles</h2>
                      <table>
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Role Description</th>
                            <th>No. of People</th>
                            <th>Role Category</th>
                          </tr>
                        </thead>
                        <tbody>
                        {projectData.roles?.map(
                        (roleData, k) => (
                            <tr key={k}>
                              <td>{roleData.role_title}</td>
                              <td>{roleData.role_desc}</td>
                              <td>{roleData.role_no_needed - roleData.role_filled}</td>
                              <td>{roleData.role_category}</td>
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  {projectData.state === 'Open' ? <div className="project-footer">State: {projectData.state}</div> : <div className="card-footer" style={{color: "white", backgroundColor: "red"}}>State: {projectData.state}</div>}
                </div>
              </div>
            </div>
      )
  }
export default Project;