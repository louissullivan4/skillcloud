import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Row, Col, Container, Button, Table } from "react-bootstrap";

import Sidebar from "../components/Sidebar";

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
    <div className="App">
    <Sidebar/>
    <div className="page">
      <h1 style={{marginBottom: "1em"}}>Project ID - {projectData.id}</h1>
        <div className="pagecontent">
          <Container style={{ position: "absolute"}}>
              <Row style={{ marginBottom: "2em"}}>
                <Col xs={6} md={8} lg={12}>
                  <Card
                    border={projectData.state === 'Open' ? 'success' : 'danger'}  
                    text='primary'> 
                    <Card.Header style={{color: "black", display:"flex", justifyContent: "space-between", fontSize: '2em'}}>Project - {projectData.title} 
                    {projectData.state === 'Open' ? <Button type="button" className="but-pos" onClick={handleClick}>Apply Here  </Button> : <Button type="button" className="but-neg" onClick={goBack}>Back to Home</Button>}</Card.Header>
                        <Card.Body style={{color: "black"}}>
                            <Card.Text style={{padding: '0'}}>Project Summary: {projectData.summary}</Card.Text>
                            <Card.Text style={{padding: '0', display: 'inline'}}>Start Date: {projectData.start_date}</Card.Text>
                            <Card.Text style={{padding: '0'}}>End Date: {projectData.end_date}</Card.Text>
                            <Card.Text style={{padding: '0', paddingBottom: '1em', borderBottom: '1px solid #c0c0c0'}}>Project Creator: {projectData.author}</Card.Text>
                            <h2 style={{paddingTop: '0.25em'}}>Project Roles</h2>
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
                        </Card.Body>
                        {projectData.state === 'Open' ? <Card.Footer style={{color: "white", backgroundColor: "green"}}>State: {projectData.state}</Card.Footer> : <Card.Footer style={{color: "white", backgroundColor: "red"}}>State: {projectData.state}</Card.Footer>}
                    </Card>
                </Col>
              </Row>
          </Container>
        </div>
      </div>
    </div>
  )
}
export default Project;