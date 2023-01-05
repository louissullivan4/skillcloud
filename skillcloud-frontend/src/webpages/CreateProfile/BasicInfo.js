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
        if (basicInfo.fname === "" || basicInfo.lname === "" || basicInfo.city === "" || basicInfo.country === "" || basicInfo.title === "" || basicInfo.category === "Select a role category..." || basicInfo.desc === "") {
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
        let basicCert = {...basicInfo, certs: certDetails.certs}
        const [validated, message] = validateForm()
        if (validated === true) {
            let finalInfo = {...basicCert, email: state.email}
            navigate('/moredetails', {state:{ ...finalInfo}})
        } else {
            alert(message)
        }
    }

    const addCert = () => {
        let newList = [...certDetails.certs, {certName: ""}]
        let newCertDetails = {...certDetails, certs: newList}
        setCertDetails(newCertDetails)
    };

    const removeCert = () => {
        let newList = [...certDetails.certs]
        let end = newList.length
        if (end > 1){
            newList.pop();
            let newCertDetails = {...certDetails, certs: newList}
            setCertDetails(newCertDetails)
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-indigo-100">
            <div className="bg-white rounded shadow-2xl w-11/12 md:w-9/12 lg:w-1/2">
                {/* create profitle in center top with large text and diffrent font*/}
                <div className="text-center pt-6">Create Profile</div>
    
                <div className='header2'>Basic Info</div>
                <div className='body'>
                    <form onSubmit={submitHandler}>
                        <div className="formVal">
                            <label htmlFor="fname">First name</label>
                            <input onChange={(e) => setBasicInfo({...basicInfo, fname: e.target.value})} type="text"/>
                        </div>
                        <div className="formVal">
                            <label htmlFor="lname">Last name</label>
                            <input onChange={(e) => setBasicInfo({...basicInfo, lname: e.target.value})} type="text"/>
                        </div>
                        <p>Location</p>
                        <div className="formVal">
                            <label htmlFor="city">City</label>
                            <input onChange={(e) => setBasicInfo({...basicInfo, city: e.target.value})} type="text"/>
                        </div>
                        <div className="formVal">
                            <label htmlFor="country">Country</label>
                            <input onChange={(e) => setBasicInfo({...basicInfo, country: e.target.value})} type="text"/>
                        </div>
                        <div className="formVal">
                            <label htmlFor="title">Profession</label>
                            <input onChange={(e) => setBasicInfo({...basicInfo, title: e.target.value})} type="text"/>
                        </div>
                        <div className="formVal">
                            <label htmlFor="category">Job Category</label>
                            <select onChange={(e) => setBasicInfo({...basicInfo, category: e.target.value})}>
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
                        <div className="formVal">
                            <label htmlFor="desc">Describe your professional profile</label>
                            <input onChange={(e) => setBasicInfo({...basicInfo, desc: e.target.value})} max='150' type="text"/>
                        </div>
                        <div className="formVal">
                            <label htmlFor="certifications">Certifications</label>
                            {certDetails.certs.map((_cert, index) => (
                                <div key={index}>
                                    <input type="text" onChange={e => certDetails.certs[index]["certName"] = e.target.value}/>
                                </div>
                            ))}
                        </div>
                        <div className='formVal'>
                            <button type="button" className="but-pos" onClick={addCert}>
                                Add another certification +
                            </button>
                        {certDetails.certs.length > 1 && (
                            <button type="button" className="but-neg" onClick={removeCert}>
                                Remove certification - 
                            </button>
                        
                        )}
                        </div>
                        <div className="formVal">
                            <button className="nextBut"  type="submit" >
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div> 
    );
}
export default BasicInfo;