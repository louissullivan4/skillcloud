import React, { useEffect, useState } from 'react'
import { act } from 'react-dom/test-utils';

import { Link } from 'react-router-dom';


function ProfileTabs() {
    localStorage.setItem("username", "sullivanlouis0@gmail.com");
    let email = "sullivanlouis0@gmail.com"
    const [userData, setUserData] = useState([]);
    const [userProjects, setUserProjects] = useState([]);
    const [userCerts, setUserCerts] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://127.0.0.1:5000/profile/'+email)
        const data = await resp.json();
        setUserData(data.result[0]);
        const certs = data.result[0].certifications.split(',');
        setUserCerts(certs)
        if (data.result[0].project_ids !== "None"){
            const ids = data.result[0].project_ids.split(',');
            for (let i = 0; i < ids.length; i++) {
                const resp = await fetch('http://127.0.0.1:5000/project/'+ids[i])
                const data = await resp.json();
                setUserProjects([...userProjects, data.result[0]]);
            } 
        }
      };
      fetchData()
    }, []);
    const [activeIndex, setActiveIndex] = useState(1);
    const handleClick = (index) => setActiveIndex(index);
    const checkActive = (index, className) => activeIndex === index ? className : "";
    return(
        <div>
        <div className="tabs">
            <button className={`tab ${checkActive(1, "active")}`} onClick={() => handleClick(1)}>Projects</button>
            <button className={`tab ${checkActive(2, "active")}`} onClick={() => handleClick(2)}>More Information</button>
        </div>
        <div className={`chosen ${checkActive(1, "active")}`}>
        <div className="row">
            <div className="col">
                <div className="card">
                    <div className="card-header">Projects</div>
                        <div className="card-body">
                        {userProjects.map((userProjects, k) => (
                        <div className='col' key={k}>
                            <Link to={`/project/${userProjects.id}`}>
                            <div className='card'>
                                <div className='card-header'>{userProjects.title}</div>
                                <div className='card-body'>
                                    <div className='card-text'>{userProjects.summary}...</div>
                                </div>
                            </div>
                            </Link>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div className={`chosen ${checkActive(2, "active")}`}>
        <div className="row">
        <div className="col">
            <div className="card">
                <div className="card-header">Education</div>
                    <div className="card-body">
                        <div className='card'>
                            <div className="card-text"><b>{userData.edu_name}</b></div>
                            <div className="card-text">{userData.edu_school}</div>
                            <div className="card-text">{userData.edu_summary}</div>
                        </div>
                    </div>
            </div>
        </div>
        </div>
        <div className="row">
        <div className="col">
            <div className="card">
                <div className="card-header">Certifications</div>
                <div className="card-body">
                    {userCerts.map((userCerts, k) => (
                    <div className='col' key={k}>
                    <div className='card'>
                        <div className='card-body'>
                            <div className='card-text'>{userCerts}</div>
                        </div>
                    </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>
    )
}

export default ProfileTabs
