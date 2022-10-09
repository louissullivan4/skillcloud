import React, { useEffect, useState } from 'react'

import { Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
        <Form onSubmit={submitHandler}>
        <Row>
            <Col sm={6}>
            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Project Title</Form.Label>
                <Form.Control maxLength={"25"} type="text" placeholder="Enter project title" onChange={(e) => setProjectDetails({...projectDetails, project_title: e.target.value})}/>
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

        {projectDetails.roles.map((_role, index) => (
        <Row key={index} className="mb-3">
            <Col>
                <Form.Group className="mb-3" controlId="formRoleTitle">
                    <Form.Control 
                    type="text" 
                    placeholder="Enter role title"
                    onChange={e => projectDetails.roles[index]["role_title"] = e.target.value}
                    />
                </Form.Group>
            </Col>
            <Col sm={4}>
                <Form.Group className="mb-3" controlId="formRoleDesc">
                    <Form.Control 
                    type="text" 
                    placeholder="Enter a detailed role description" 
                    onChange={e => projectDetails.roles[index]["role_desc"] = e.target.value}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formRoleCategory">
                    <Form.Select onChange={e => projectDetails.roles[index]["role_category"] = e.target.value}>
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
                    onChange={e => projectDetails.roles[index]["role_no_needed"] = e.target.value}
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
            {projectDetails.roles.length > 1 && (
            <Col>
            <Button type="button" className="but-neg" onClick={removeRole}>
                Remove role - 
            </Button>
            </Col>
            )}
        </Row>
        <Row>
            <Col>
                <Button variant="primary" className="but-submit"  type="submit" >
                    Create
                </Button> 
            </Col>
        </Row>
        </Form>
    );
}


export default ProjectForm;