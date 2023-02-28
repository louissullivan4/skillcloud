import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

import "../../index.css";

const BasicInfo = () => {
    const location = useLocation()
    let navigate = useNavigate();
    const state = location.state
    
    const [basicInfo, setBasicInfo] = useState({});
    const [certDetails, setCertDetails] = useState({
        certifications: [
            {
                certName: "",
            },
        ]
    });    

    const validateForm = () => {
        let valid = true;
        let message = "";
        if (basicInfo.fname === "" || basicInfo.lname === "" || basicInfo.city === "" || basicInfo.country === "" || basicInfo.job_title === "" || basicInfo.job_category === "Select a role category..." || basicInfo.job_category === "" || basicInfo.job_desc === "") {
            valid = false;
            message = "Error! Please fill in all required fields";
        }
        certDetails.certifications.forEach((cert) => {
            if (cert.certName === "") {
                valid = false;
                message = "Error! Please fill in all required fields";
            }
        })
        return [valid, message]
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setBasicInfo({...basicInfo, email: state.email})
        let basicCert = {...basicInfo, certifications: certDetails.certifications}
        const [validated, message] = validateForm()
        if (validated === true) {
            let finalInfo = {...basicCert, email: state.email}
            console.log(finalInfo)
            navigate('/moredetails', {state:{ ...finalInfo, email: state.email,  password: state.password}})
        } else {
            alert(message)
        }
    }

    const addCert = () => {
        let newList = [...certDetails.certifications, {certName: ""}]
        let newCertDetails = {...certDetails, certifications: newList}
        setCertDetails(newCertDetails)
        console.log(certDetails)
    };

    const removeCert = () => {
        let newList = [...certDetails.certifications]
        let end = newList.length
        if (end > 0){
            newList.pop();
            let newCertDetails = {...certDetails, certifications: newList}
            setCertDetails(newCertDetails)
        }
    };

    const getDescription = (e) => {
        let descval = (e.target.value).toString()
        setBasicInfo({...basicInfo, job_desc: descval})
    }

    const goBack = () => {
        navigate("/createaccount")
    }

    return (
        <div className='create-profile-page'>
            <div className='create-profile-heading'>
                <div>Create Profile</div>
            </div>
            <div className='create-profile-body'>
            <div className='create-profile-title'>Basic Info</div>
                <form>
                    <div className='create-profile-form'>
                        <div className='inline-create'>
                            <label htmlFor="fname">First name</label>
                            <input onChange={(e) => setBasicInfo({...basicInfo, fname: e.target.value})} type="text"/>
                            <label htmlFor="lname">Last name</label>
                            <input onChange={(e) => setBasicInfo({...basicInfo, lname: e.target.value})} type="text"/>
                        </div>
                        <div className='inline-create'>
                            <label htmlFor="city">City</label>
                            <input onChange={(e) => setBasicInfo({...basicInfo, city: e.target.value})} type="text"/>
                            <label htmlFor="country">Country</label>
                            <input onChange={(e) => setBasicInfo({...basicInfo, country: e.target.value})} type="text"/>
                        </div>
                        <div className='inline-create'>
                            <label htmlFor="job_title">Profession</label>
                            <input onChange={(e) => setBasicInfo({...basicInfo, job_title: e.target.value})} type="text"/>
                            <label htmlFor="job_category">Job Category</label>
                            <select onChange={(e) => setBasicInfo({...basicInfo, job_category: e.target.value})}>
                            <option disabled selected>Select a role category...</option>
                            {/*The following occupation list was created by 
                            McKenna,J (2017) occupation-dropdown.html[Source Code]. https://gist.github.com/ag14spirit/fbf877576c9d6b78899e3ad02fe92b50*/}
                            <optgroup label="Healthcare Practitioners and Technical Occupations:">
                                <option>Chiropractor</option>
                                <option>Dentist</option>
                                <option>Dietitian or Nutritionist</option>
                                <option>Optometrist</option>
                                <option>Pharmacist</option>
                                <option>Physician</option>
                                <option>Physician Assistant</option>
                                <option>Podiatrist</option>
                                <option>Registered Nurse</option>
                                <option>Therapist</option>
                                <option>Veterinarian</option>
                                <option>Health Technologist or Technician</option>
                                <option>Other Healthcare Practitioners and Technical Occupation</option>
                                </optgroup>
                                <optgroup label="Healthcare Support Occupations:">
                                <option>Nursing, Psychiatric, or Home Health Aide</option>
                                <option>Occupational and Physical Therapist Assistant or Aide</option>
                                <option>Other Healthcare Support Occupation</option>
                                </optgroup>
                                <optgroup label="Business, Executive, Management, and Financial Occupations:">
                                <option>Chief Executive</option>
                                <option>General and Operations Manager</option>
                                <option>Advertising, Marketing, Promotions, Public Relations, and Sales Manager</option>
                                <option>Operations Specialties Manager (e.g., IT or HR Manager)</option>
                                <option>Construction Manager</option>
                                <option>Engineering Manager</option>
                                <option>Accountant, Auditor</option>
                                <option>Business Operations or Financial Specialist</option>
                                <option>Business Owner</option>
                                <option>Other Business, Executive, Management, Financial Occupation</option>
                                </optgroup>
                                <optgroup label="Architecture and Engineering Occupations:">
                                <option>Architect, Surveyor, or Cartographer</option>
                                <option>Engineer</option>
                                <option>Other Architecture and Engineering Occupation</option>
                                </optgroup>
                                <optgroup label="Education, Training, and Library Occupations:">
                                <option>Post-secondary Teacher (e.g., College Professor)</option>
                                <option>Primary School Teacher</option>
                                <option>Secondary Education School Teacher</option>
                                <option>Special Education School Teacher</option>
                                <option>Other Teacher or Instructor</option>
                                <option>Other Education, Training, and Library Occupation</option>
                                </optgroup>
                                <optgroup label="Computer Occupations:">
                                <option>Computer Scientist</option>
                                <option>Data Scientist</option>
                                <option>Hardware Engineer</option>
                                <option>IT Consultant</option>
                                <option>Security engineer</option>
                                <option>Test engineer</option>
                                <option>UX designer</option>
                                <option>Web developer</option>
                                </optgroup>
                                <optgroup label="Other Professional Occupations:">
                                <option>Arts, Design, Entertainment, Sports, and Media Occupations</option>
                                <option>Mathematical Science</option>
                                <option>Counselor, Social Worker, or Other Community and Social Service Specialist</option>
                                <option>Lawyer, Judge</option>
                                <option>Life Scientist (e.g., Animal, Food, Soil, or Biological Scientist, Zoologist)</option>
                                <option>Physical Scientist (e.g., Astronomer, Physicist, Chemist, Hydrologist)</option>
                                <option>Religious Worker (e.g., Clergy, Director of Religious Activities or Education)</option>
                                <option>Social Scientist and Related Worker</option>
                                <option>Other Professional Occupation</option>
                                </optgroup>
                                <optgroup label="Office and Administrative Support Occupations:">
                                <option>Supervisor of Administrative Support Workers</option>
                                <option>Financial Clerk</option>
                                <option>Secretary or Administrative Assistant</option>
                                <option>Material Recording, Scheduling, and Dispatching Worker</option>
                                <option>Other Office and Administrative Support Occupation</option>
                                </optgroup>
                                <optgroup label="Services Occupations:">
                                <option>Protective Service (e.g., Fire Fighting, Police Officer, Correctional Officer)</option>
                                <option>Chef or Head Cook</option>
                                <option>Cook or Food Preparation Worker</option>
                                <option>Food and Beverage Serving Worker (e.g., Bartender, Waiter, Waitress)</option>
                                <option>Building and Grounds Cleaning and Maintenance</option>
                                <option>Personal Care and Service (e.g., Hairdresser, Flight Attendant, Concierge)</option>
                                <option>Sales Supervisor, Retail Sales</option>
                                <option>Retail Sales Worker</option>
                                <option>Insurance Sales Agent</option>
                                <option>Sales Representative</option>
                                <option>Real Estate Sales Agent</option>
                                <option>Other Services Occupation</option>
                                </optgroup>
                                <optgroup label="Agriculture, Maintenance, Repair, and Skilled Crafts Occupations:">
                                <option>Construction and Extraction (e.g., Construction Laborer, Electrician)</option>
                                <option>Farming, Fishing, and Forestry</option>
                                <option>Installation, Maintenance, and Repair</option>
                                <option>Production Occupations</option>
                                <option>Other Agriculture, Maintenance, Repair, and Skilled Crafts Occupation</option>
                                </optgroup>
                                <optgroup label="Transportation Occupations:">
                                <option>Aircraft Pilot or Flight Engineer</option>
                                <option>Motor Vehicle Operator (e.g., Ambulance, Bus, Taxi, or Truck Driver)</option>
                                <option>Other Transportation Occupation</option>
                                </optgroup>
                                <optgroup label="Other Occupations:">
                                <option>Military</option>
                                <option>Homemaker</option>
                                <option>Other Occupation</option>
                                </optgroup>
                            </select>
                        </div>
                        <div className='inline-create'>
                            <label htmlFor="job_desc">Describe your professional profile</label>
                            <textarea rows="7" cols="80" onChange={getDescription} max='150' type="text"/>
                        </div>
                        <label htmlFor="certifications">Certifications</label>
                        {certDetails.certifications.map((_cert, index) => (
                            <div key={index}>
                                <input type="text" onChange={e => certDetails.certifications[index]["certName"] = e.target.value}/>
                            </div>
                        ))}
                        <div className='button-group'>
                            <button type="button" onClick={addCert} style={{"backgroundColor": "green"}}>
                                Add another certification +
                            </button>
                            {certDetails.certifications.length > 0 && (
                                <button type="button" onClick={removeCert} style={{"backgroundColor": "red"}}>
                                    Remove certification - 
                                </button>
                            
                            )}
                        </div>
                        <button onClick={goBack}>Back</button>
                        <button type="submit" onClick={submitHandler} >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div> 
    );
}
export default BasicInfo;