import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BeatLoader from 'react-spinners/BeatLoader'

import "../../index.css";

const ProjectForm = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('email');
    const [spinner, setSpinner] = useState(false); 
    // const [data, setData] = useState();
    const [projectDetails, setProjectDetails] = useState(
        {roles: [{ 
        role_category: "",
        role_title: "",
        role_desc: "",
        role_no_needed: "",
        role_remote: ""
        },]}
    );


    const sendData = async () => {
        setSpinner(true);
        const resp = await fetch(`http://scbackend-env.eba-imjep3am.eu-north-1.elasticbeanstalk.com/createproject`,{'method':'POST', headers : {'Content-Type':'application/json'}, body: JSON.stringify(projectDetails)})
        .then(setSpinner(false));
        const data = await resp.json();        
        return data
      };

      const event_match = async (newData) => {
        const resp = await fetch(`http://scbackend-env.eba-imjep3am.eu-north-1.elasticbeanstalk.com/eventmatch`,{'method':'POST', headers : {'Content-Type':'application/json'}, body: JSON.stringify(newData)})
        .then(setSpinner(false));
        if (resp.status === 200) {
            alert("Project created successfully");
            // navigate('/home');
        } else {
            alert("Project creation failed. Please try again.");
        }
      };

    
    useEffect(() => {
        const authorAdd = {...projectDetails, project_author: user}
        setProjectDetails(authorAdd)
    }, []);

    const validateForm = () => {
        let valid = true;
        let message = "";
        let start = new Date(projectDetails.project_startdate);
        let end = new Date(projectDetails.project_enddate);
        if (projectDetails.project_title === "" || projectDetails.project_summary === "" || projectDetails.project_startdate === "" || projectDetails.project_enddate === "" || projectDetails.project_author === ""|| projectDetails.project_city === ""|| projectDetails.project_country === "") {
            valid = false;
            message = "Error! Please fill in all required fields";
        } else if (start > end) {
            valid = false;
            message = "Error! Please choose a start date before the entered end date.";
        }
        projectDetails.roles.forEach((role) => {
            if (role.role_category === "" || role.role_title === "" || role.role_desc === "" || role.role_no_needed === "" || role.role_category === "Select a role category..." || role.role_category < 1 || role.role_remote === "") {
                valid = false;
                message = "Error! Please fill in all required fields";
            }
        })
        return [valid, message]
    }

    const submitHandler = async (e) => {        
        e.preventDefault()
        let validated = validateForm()
        if (validated[0]) {
            let newData = await sendData()
            alert("The project will now be created, you will be notified when creation has been completed. Please free to continue using the site.");
            event_match(newData)
        } else {
            alert(validated[1])
        }
    };

    const addRole = () => {
        let newList = [...projectDetails.roles, {role_category: "", role_title: "", role_desc: "", role_no_needed: "", role_remote: ""}]
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
        ( spinner === true ? 
            <BeatLoader color="#36d7b7" /> :
            <form onSubmit={submitHandler}>
                <div className="create-project">
                    <label htmlFor="title">Project Title</label>
                    <input type="text" maxLength={"100"} placeholder="Enter project title..." onChange={(e) => setProjectDetails({...projectDetails, project_title: e.target.value})}/>
                    <div className='inline-create'>
                        <label htmlFor="startdate">Start Date</label>
                        <input type="date" onChange={(e) => setProjectDetails({...projectDetails, project_startdate: e.target.value})}/>
                        <label htmlFor="enddate">End Date</label>
                        <input type="date" onChange={(e) => setProjectDetails({...projectDetails, project_enddate: e.target.value})}/>
                    </div>
                    <div className='inline-create'>
                        <label htmlFor="city">City</label>
                        <input type="text" onChange={(e) => setProjectDetails({...projectDetails, project_city: e.target.value})}/>
                        <label htmlFor="country">Country</label>
                        <input type="text" onChange={(e) => setProjectDetails({...projectDetails, project_country: e.target.value})}/>
                    </div>
                    <label htmlFor="projectsum">Project Summary</label>
                    <textarea type="text" rows="5" cols="33" placeholder="Enter project summary..." onChange={(e) => setProjectDetails({...projectDetails, project_summary: e.target.value})}/>
                </div>
                <div className="create-body-roles">
                    <h2>Roles Needed</h2>
                    <div className="create-body-roles-header">
                        <label className='input-role-title'>Role Title</label>
                        <label className='input-role-desc'>Role Description</label>
                        <label className='input-role-category'>Role Category</label>
                        <label className='input-role-remote'>Is the role remote?</label>
                        <label className='input-role-no'>Number Needed</label>
                    </div>
                    <div className='create-body-roles-body'>
                        {projectDetails.roles.map((_role, index) => (
                            <div key={index}>
                                <input
                                    className='input-role-title'
                                    type="text" 
                                    placeholder="Enter role title"
                                    onChange={e => projectDetails.roles[index]["role_title"] = e.target.value}/>
                                <input
                                    className='input-role-desc'
                                    type="text" 
                                    placeholder="Enter a detailed role description" 
                                    onChange={e => projectDetails.roles[index]["role_desc"] = e.target.value}/>
                                <select className="input-role-category" onChange={e => projectDetails.roles[index]["role_category"] = e.target.value}>
                                    <option disabled selected>Select a role category...</option>
                                    {/*The following occupation list was created by 
                                    McKenna,J (2017) occupation-dropdown.html[Source Code]. https://gist.github.com/ag14spirit/fbf877576c9d6b78899e3ad02fe92b50*/}
                                    <optgroup label="Healthcare Practitioners and Technical Occupations:">
                                        <option>-  Dentist</option>
                                        <option>-  Dietitian or Nutritionist</option>
                                        <option>-  Optometrist</option>
                                        <option>-  Pharmacist</option>
                                        <option>-  Physician</option>
                                        <option>-  Physician Assistant</option>
                                        <option>-  Podiatrist</option>
                                        <option>-  Registered Nurse</option>
                                        <option>-  Therapist</option>
                                        <option>-  Veterinarian</option>
                                        <option>-  Health Technologist or Technician</option>
                                        <option>-  Other Healthcare Practitioners and Technical Occupation</option>
                                        </optgroup>
                                        <optgroup label="Healthcare Support Occupations:">
                                        <option>-  Nursing, Psychiatric, or Home Health Aide</option>
                                        <option>-  Occupational and Physical Therapist Assistant or Aide</option>
                                        <option>-  Other Healthcare Support Occupation</option>
                                        </optgroup>
                                        <optgroup label="Business, Executive, Management, and Financial Occupations:">
                                        <option>-  Chief Executive</option>
                                        <option>-  General and Operations Manager</option>
                                        <option>-  Advertising, Marketing, Promotions, Public Relations, and Sales Manager</option>
                                        <option>-  Operations Specialties Manager (e.g., IT or HR Manager)</option>
                                        <option>-  Construction Manager</option>
                                        <option>-  Engineering Manager</option>
                                        <option>-  Accountant, Auditor</option>
                                        <option>-  Business Operations or Financial Specialist</option>
                                        <option>-  Business Owner</option>
                                        <option>-  Other Business, Executive, Management, Financial Occupation</option>
                                        </optgroup>
                                        <optgroup label="Information Technology and Communication Occupations:">
                                        <option>-  Software Engineer, Full Stack Developer, Programmer, Web Developer</option>
                                        <option>-  QA Tester, Test Analyst</option>
                                        <option>-  UX Designer</option>
                                        <option>-  Database Administrator, Database Analyst</option>
                                        <option>-  Network Engineer, Network Administrator</option>
                                        <option>-  Systems Administrator, Systems Analyst, Systems Engineer</option>
                                        <option>-  IT Consultant, IT Manager</option>
                                        <option>-  Tech Support</option>
                                        <option>-  Other Architecture and Engineering Occupation</option>
                                        </optgroup>
                                        <optgroup label="Engineering Occupations:">
                                        <option>-  Architect, Surveyor, or Cartographer</option>
                                        <option>-  Chemical Engineer</option>
                                        <option>-  Industrial Engineer</option>
                                        <option>-  Manufacturing Engineer</option>
                                        <option>-  Environmental Engineer</option>
                                        <option>-  Biomedical engineer</option>
                                        <option>-  Civil engineer</option>
                                        <option>-  Electrical engineer</option>
                                        <option>-  Mechanical engineer</option>
                                        <option>-  Other Engineering Occupation</option>
                                        </optgroup>
                                        <optgroup label="Education, Training, and Library Occupations:">
                                        <option>-  Postsecondary Teacher (e.g., College Professor)</option>
                                        <option>-  Primary School Teacher</option>
                                        <option>-  Secondary Education School Teacher</option>
                                        <option>-  Special Education School Teacher</option>
                                        <option>-  Other Teacher or Instructor</option>
                                        <option>-  Other Education, Training, and Library Occupation</option>
                                        </optgroup>
                                        <optgroup label="Other Professional Occupations:">
                                        <option>-  Arts, Design, Entertainment, Sports, and Media Occupations</option>
                                        <option>-  Content Creator, Social Media Influencer, Professional e-sports Player</option>
                                        <option>-  Mathematical Science</option>
                                        <option>-  Counselor, Social Worker, or Other Community and Social Service Specialist</option>
                                        <option>-  Lawyer, Judge</option>
                                        <option>-  Life Scientist (e.g., Animal, Food, Soil, or Biological Scientist, Zoologist)</option>
                                        <option>-  Physical Scientist (e.g., Astronomer, Physicist, Chemist, Hydrologist)</option>
                                        <option>-  Religious Worker (e.g., Clergy, Director of Religious Activities or Education)</option>
                                        <option>-  Social Scientist and Related Worker</option>
                                        <option>-  Other Professional Occupation</option>
                                        </optgroup>
                                        <optgroup label="Office and Administrative Support Occupations:">
                                        <option>-  Supervisor of Administrative Support Workers</option>
                                        <option>-  Financial Clerk</option>
                                        <option>-  Secretary or Administrative Assistant</option>
                                        <option>-  Material Recording, Scheduling, and Dispatching Worker</option>
                                        <option>-  Other Office and Administrative Support Occupation</option>
                                        </optgroup>
                                        <optgroup label="Services Occupations:">
                                        <option>-  Protective Service (e.g., Fire Fighting, Police Officer, Correctional Officer)</option>
                                        <option>-  Chef or Head Cook</option>
                                        <option>-  Cook or Food Preparation Worker</option>
                                        <option>-  Food and Beverage Serving Worker (e.g., Bartender, Waiter, Waitress)</option>
                                        <option>-  Building and Grounds Cleaning and Maintenance</option>
                                        <option>-  Personal Care and Service (e.g., Hairdresser, Flight Attendant, Concierge)</option>
                                        <option>-  Sales Supervisor, Retail Sales</option>
                                        <option>-  Retail Sales Worker</option>
                                        <option>-  Insurance Sales Agent</option>
                                        <option>-  Sales Representative</option>
                                        <option>-  Real Estate Sales Agent</option>
                                        <option>-  Other Services Occupation</option>
                                        </optgroup>
                                        <optgroup label="Agriculture, Architecture, Maintenance, Repair, and Skilled Crafts Occupations:">
                                        <option>-  Construction and Extraction (e.g., Construction Laborer, Carpenter, Electrician)</option>
                                        <option>-  Farming, Fishing, and Forestry</option>
                                        <option>-  Installation, Maintenance, and Repair</option>
                                        <option>-  Production Occupations</option>
                                        <option>-  Other Agriculture, Architecture, Maintenance, Repair, and Skilled Crafts Occupation</option>
                                        </optgroup>
                                        <optgroup label="Transportation Occupations:">
                                        <option>-  Aircraft Pilot or Flight Engineer</option>
                                        <option>-  Motor Vehicle Operator (e.g., Ambulance, Bus, Taxi, or Truck Driver)</option>
                                        <option>-  Other Transportation Occupation</option>
                                        </optgroup>
                                        <optgroup label="Other Occupations:">
                                        <option>-  Military</option>
                                        <option>-  Homemaker</option>
                                        <option>-  Other Occupation</option>
                                        </optgroup>
                                    </select>
                                    <select className="input-role-remote" onChange={e => projectDetails.roles[index]["role_remote"] = e.target.value}>
                                        <option>Select...</option>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </select>
                                <input
                                className="input-role-no"
                                type="number" 
                                placeholder="1" 
                                min='1'
                                max='100'   
                                onChange={e => projectDetails.roles[index]["role_no_needed"] = e.target.value}/>
                            </div>
                        ))}
                </div>
                <div className="buttons-add-remove">
                    <button type="button" onClick={addRole} style={{"backgroundColor": "green"}}>
                        Add another role +
                    </button>
                    {projectDetails.roles.length > 1 && (
                        <button type="button" onClick={removeRole} style={{"backgroundColor": "red"}}>
                            Remove role - 
                        </button>
                    )}
                </div>
                </div>
                <button type="submit" style={{"margin": "0.5em"}}>
                    Create
                </button> 
            </form>
        )
    )
}


export default ProjectForm;