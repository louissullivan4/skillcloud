import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';

const ProfileTabs = () => {
    let email = localStorage.user;
    console.log("email = " + email)

    const [userData, setUserData] = useState([]);
    const [userProjects, setUserProjects] = useState([]);
    const [userCerts, setUserCerts] = useState([]);
    const [userEducation, setUserEducation] = useState([]);
    const [userWork, setUserWork] = useState([]);
    const hasFetchedData = useRef(false);

    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://127.0.0.1:5000/profile/'+email)
        const data = await resp.json();
        setUserData(data.result[0]);

        const certs = data.result[0].certifications.split(',');
        setUserCerts(certs)

        const education = data.result[0].education
        setUserEducation(education)
                
        const work = data.result[0].work_experience
        setUserWork(work)

        if (data.result[0].project_ids !== "None"){
            const ids = data.result[0].project_ids.split(',');
            for (let i = 0; i < ids.length; i++) {
                const resp = await fetch('http://127.0.0.1:5000/project/'+ids[i])
                const data = await resp.json();
                setUserProjects(userProjects => [...userProjects, data.result[0]]);
            } 
        }
      };
      if (hasFetchedData.current === false) {
        fetchData();
        hasFetchedData.current = true;
      } 
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
                        {userEducation.map((userEducation, k) => (
                        <div className='col' key={k}>
                            <div className="card-text"><b>{userEducation.edu_type}</b> {userEducation.edu_degree}</div>
                            <div className="card-text">{userEducation.edu_school}</div>
                            <div className="card-text">{userEducation.edu_desc}</div>
                            <br></br>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
        <div className="col">
            <div className="card">
                <div className="card-header">Work Experience</div>
                    <div className="card-body">
                        {userWork.map((userWork, k) => (
                        <div className='col' key={k}>
                            <div className="card-text"><b>{userWork.experience_name} - {userWork.experience_title}</b></div>
                            <div className="card-text">{userWork.experience_start} - {userWork.experience_end}</div>
                            <div className="card-text">{userWork.experience_desc}</div>
                            <br></br>
                        </div>
                        ))}
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
