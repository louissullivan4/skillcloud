import React, { useEffect, useState } from 'react'

import { Form, Row, Col, Button } from "react-bootstrap";

import "../index.css";


function ProjectForm() {
    // const [user, setUser] = useState(localStorage.getItem("username"));
    // localStorage.setItem("username", user);
    // setUser("amy@gmail.com")
    const [projectDetails, setProjectDetails] = useState([]);
    const [roleList, setRoleList] = useState([{ 
        role_category: "",
        role_title: "",
        role_desc: "",
        role_no_needed: "",
    },]);

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(projectDetails)
        console.log(roleList)
    }

    const roleHandler = (e, index, name) => {
        let newList = [...roleList];
        newList[index][name] = e.target.value;
        setRoleList(newList);
    }

    const addRole = () => {
        let newRole = { 
            role_category: "",
            role_title: "",
            role_desc: "",
            role_no_needed: "",
        }
        setRoleList([...roleList, newRole])
      };

      const removeRole = () => {
        let newList = [...roleList]
        if (newList.length > 1){
            newList.pop();
            setRoleList(newList);
        }
      };

    return (
        <Form onSubmit={submitHandler}>
        <Row>
            <Col sm={6}>
            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Project Title</Form.Label>
                <Form.Control type="text" placeholder="Enter project title" onChange={(e) => setProjectDetails({...projectDetails, project_title: e.target.value})}/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" placeholder="Enter start date" onChange={(e) => setProjectDetails({...projectDetails, project_startdate: e.target.value})}/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" controlId="formEndDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" placeholder="Enter end date" onChange={(e) => setProjectDetails({...projectDetails, project_enddate: e.target.value})}/>
            </Form.Group>
            </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formDesc">
            <Form.Label>Project Summary</Form.Label>
            <Form.Control type="text" placeholder="Enter project summary" onChange={(e) => setProjectDetails({...projectDetails, project_summary: e.target.value})}/>
        </Form.Group>
        <br></br>
        <h3>Roles Needed</h3>
        <br></br>
        <Row className="mb-3">
            <Col>
                <Form.Label>Role Title</Form.Label>
            </Col>
            <Col sm={4}>
                <Form.Label>Role Description</Form.Label>
            </Col>
            <Col>
                <Form.Label>Role Category</Form.Label>
            </Col>
            <Col sm={1}>
                <Form.Label>Role Count</Form.Label>
            </Col>
        </Row>

        {roleList.map((role, index) => (
        <Row key={index} className="mb-3">
            <Col>
                <Form.Group className="mb-3" controlId="formRoleTitle">
                    <Form.Control 
                    type="text" 
                    placeholder="Enter role title"
                    onChange={e => roleHandler(e, index, "role_title")}
                    />
                </Form.Group>
            </Col>
            <Col sm={4}>
                <Form.Group className="mb-3" controlId="formRoleDesc">
                    <Form.Control 
                    type="text" 
                    placeholder="Enter a detailed role description" 
                    onChange={e => roleHandler(e, index, "role_desc")}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formRoleCategory">
                    <Form.Select onChange={e => roleHandler(e, index, "role_category")}>
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
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col sm={1}>
                <Form.Group className="mb-3" controlId="formNeeded">
                    <Form.Control 
                    type="number" 
                    placeholder="1" 
                    min='1'
                    max='100'   
                    onChange={e => roleHandler(e, index, "role_no_needed")}
                    />
                </Form.Group>
            </Col>
            </Row>
        ))}

        <Row className="create-project-buts">
            <Col xs={2}>
            <Button type="button" className="but-pos" onClick={addRole}>
                Add another role +
            </Button>
            </Col>
            {roleList.length > 1 && (
                    <Col>
                    <Button type="button" className="but-neg" onClick={removeRole}>
                        Remove role - 
                    </Button>
                    </Col>
                )}
        </Row>
        <Row>
            <Col>
                <Button variant="primary" className="but-submit"  type="submit">
                    Create
                </Button> 
            </Col>
        </Row>
        </Form>
    );
}

export default ProjectForm;