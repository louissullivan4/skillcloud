import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

import "../../index.css";

const BasicInfo = () => {
    const location = useLocation()
    let navigate = useNavigate(); 
    const { state } = location.state

    const [certDetails, setCertDetails] = useState({
        certs: [
            {
                certName: "",
            },
        ]
    });
    console.log(certDetails.certs)
    

    const submitHandler = (e) => {
        e.preventDefault()
        // navigate('/previousexperience',{state:{ email: state.email }})
        console.log("submitted")
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
        <div className="app">
            <div className="page">
                <div className="page-content">
                    <div className='container'>
                        <div className='header'>Basic Info</div>
                        <div className='body'>
                            <form onSubmit={submitHandler}>
                                <div className="formVal">
                                    <label htmlFor="fname">First name</label>
                                    <input type="text"/>
                                </div>
                                <div className="formVal">
                                    <label htmlFor="lname">Last name</label>
                                    <input type="text"/>
                                </div>
                                <p>Location</p>
                                <div className="formVal">
                                    <label htmlFor="city">City</label>
                                    <input type="text"/>
                                </div>
                                <div className="formVal">
                                    <label htmlFor="country">Country</label>
                                    <input type="text"/>
                                </div>
                                <p>Are you willing to work remotely?</p>
                                <div className="formVal">
                                    <label htmlFor="yes">Yes</label>
                                    <input type="radio" id="remoteyes" name='remotework' value="Yes"/>
                                    <label htmlFor="no">No</label>
                                    <input type="radio" id="remoteno" name='remotework' value="No"/>
                                </div>
                                <div className="formVal">
                                    <label htmlFor="title">Job Title</label>
                                    <input type="text"/>
                                </div>
                                <div className="formVal">
                                    <label htmlFor="category">Job Category</label>
                                    <select>
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
                                    <label htmlFor="desc">Describe your job and skills</label>
                                    <input type="text"/>
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
            </div>
        </div>
    );
}
export default BasicInfo;