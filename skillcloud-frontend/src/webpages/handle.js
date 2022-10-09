import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";

import Sidebar from "../components/Sidebar";

function Project() {
    let projectId = useParams()
    const [projectData, setProjectData] = useState([]); 
    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://127.0.0.1:5000/project/'+projectId.id)
        const data = await resp.json();
        setProjectData(data.result[0]);
      };
      fetchData()
  }, []);
    return (
    <div className="App">
        <Sidebar/>
        <div className="page">
          <div className="pageheading">
            <h1>Project - {projectData.title}</h1>
          </div>
          <div className="pagecontent">
            <h2>Project Details</h2>
            <p style={{display:'inline', marginRight:'3em'}}>Start Date: {projectData.start_date}</p>
            <p style={{display:'inline', marginRight:'3em'}}>End Date: {projectData.end_date}</p>
            <p style={{display:'inline', marginRight:'3em'}}>State: {projectData.state}</p>
            <p style={{display:'inline'}}>Project Creator: {projectData.author} {projectData.create_date}</p>
            <h2>Project Summary</h2>
              <p>{projectData.summary}</p>
            <h2>Project Roles</h2>
              <Table>
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
                    ))
                  }
                </tbody>
              </Table>
          </div>
        </div>
    </div>
    );
}
export default Project;