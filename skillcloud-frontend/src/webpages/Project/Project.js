import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";

function Project() {
    let projectId = useParams()
    const [projectData, setProjectData] = useState([]);
    let navigate = useNavigate();

    const goBack = () =>{
      let path = `/`; 
      navigate(path);
    }

    const handleClick = () =>{ 
        let path = `/`; 
        navigate(path);
    }
    
    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://127.0.0.1:5000/project/'+projectId.id)
        const data = await resp.json();
        setProjectData(data.result[0]);
      };
      fetchData()
    }, []);

  return (
    <div className="app">
      <Sidebar/>
        <div className="page">
          <h1>Project ID - {projectData.id}</h1>
          <div className="page-content">
            <div className="container">
              <div className='row'>
                <div className='col'>
                  <div className='card'>
                  <div className='card-header'>Project - {projectData.title} 
                    {projectData.state === 'Open' ? <button type="button" className="but-pos" onClick={handleClick}>Apply Here  </button> : <div></div>}</div>
                      <div className='card-body'>
                      <div card-text>Project Summary: {projectData.summary}</div>
                      <div card-text>Start Date: {projectData.start_date}</div>
                      <div card-text>End Date: {projectData.end_date}</div>
                      <div card-text>Project Creator: {projectData.author}</div>
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
                                <td>{roleData.role_no_needed}</td>
                                <td>{roleData.role_category}</td>
                              </tr>
                            ))}
                            </tbody>
                          </table>
                        </div>
                      {projectData.state === 'Open' ? <div className="card-footer">State: {projectData.state}</div> : <div className="card-footer" style={{color: "white", backgroundColor: "red"}}>State: {projectData.state}</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
export default Project;