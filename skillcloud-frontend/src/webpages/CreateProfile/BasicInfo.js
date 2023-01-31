import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

import "../../index.css";

const BasicInfo = () => {
    const location = useLocation()
    let navigate = useNavigate();
    const state = location.state
    
    const [basicInfo, setBasicInfo] = useState({});
    const [certDetails, setCertDetails] = useState({
        certs: [
            {
                certName: "",
            },
        ]
    });    

    const validateForm = () => {
        let valid = true;
        let message = "";
        if (basicInfo.fname === "" || basicInfo.lname === "" || basicInfo.city === "" || basicInfo.country === "" || basicInfo.job_title === "" || basicInfo.job_category === "Select a role category..." || basicInfo.job_desc === "") {
            valid = false;
            message = "Error! Please fill in all required fields";
        }
        certDetails.certs.forEach((cert) => {
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
        let basicCert = {...basicInfo, certifications: certDetails.certs}
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
        let newList = [...certDetails.certs, {certName: ""}]
        let newCertDetails = {...certDetails, certifications: newList}
        setCertDetails(newCertDetails)
    };

    const removeCert = () => {
        let newList = [...certDetails.certs]
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
                            </select>
                        </div>
                        <div className='inline-create'>
                            <label htmlFor="job_desc">Describe your professional profile</label>
                            <textarea rows="7" cols="80" onChange={getDescription} max='150' type="text"/>
                        </div>
                        <label htmlFor="certifications">Certifications</label>
                        {certDetails.certs.map((_cert, index) => (
                            <div key={index}>
                                <input type="text" onChange={e => certDetails.certs[index]["certName"] = e.target.value}/>
                            </div>
                        ))}
                        <div className='button-group'>
                            <button type="button" onClick={addCert} style={{"backgroundColor": "green"}}>
                                Add another certification +
                            </button>
                            {certDetails.certs.length > 0 && (
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