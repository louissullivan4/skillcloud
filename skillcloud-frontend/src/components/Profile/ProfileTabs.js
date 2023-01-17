import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom';

const ProfileTabs = () => {
    let email = useParams()
    const [userData, setUserData] = useState([]);
    const [userCurrentProject, setCurrentProject] = useState([]);
    const [userPrevProjects, setUserPrevProjects] = useState([]);
    const [userCerts, setUserCerts] = useState([]);
    const [userEducation, setUserEducation] = useState([]);
    const [userWork, setUserWork] = useState([]);
    const hasFetchedData = useRef(false);

    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://127.0.0.1:5000/profile/'+email.email)
        const data = await resp.json();
        setUserData(data.result[0]);
        console.log(data.result[0])

        const certs = data.result[0].certifications.split(',');
        setUserCerts(certs)

        const education = data.result[0].education
        setUserEducation(education)

        const current = data.result[0].current_project
        setCurrentProject(current)
                
        const work = data.result[0].work_experience
        setUserWork(work)

        if (data.result[0].project_ids !== "None"){
            const ids = data.result[0].project_ids.split(',');
            for (let i = 0; i < ids.length; i++) {
                const resp = await fetch('http://127.0.0.1:5000/project/'+ids[i])
                const data = await resp.json();
                setUserPrevProjects(userPrevProjects => [...userPrevProjects, data]);
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
            <div className="p-row">
                <div className="p-col">
                    <div className="p-card">
                        <div className="p-card-header">Current Project</div>
                        {userCurrentProject === null ? <div className="p-card-body">No active projects 😓</div> :
                        <div className="p-card-body">
                            <Link to={`/project/${userPrevProjects.id}`}>
                                <div className='p-card'>
                                    <div className='p-card-header'>{userPrevProjects.title}</div>
                                    <div className='p-card-body'>
                                        <div className='p-card-text'>{userPrevProjects.summary}...</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        }
                    </div>
                </div>
            </div>
            <div className="p-row">
                <div className="p-col">
                    <div className="p-card">
                        <div className="p-card-header">Previous Projects</div>
                            <div className="p-card-body">
                            {userPrevProjects.map((userPrevProjects, k) => (
                            <div className='p-col' key={k}>
                                <Link to={`/project/${userPrevProjects.id}`}>
                                <div className='p-card'>
                                    <div className='p-card-header'>{userPrevProjects.title}</div>
                                    <div className='p-card-body'>
                                        <div className='p-card-text'>{userPrevProjects.summary}...</div>
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
        <div className="p-row">
        <div className="p-col">
            <div className="p-card">
                <div className="p-card-header">Education</div>
                    <div className="p-card-body">
                        {userEducation.map((userEducation, k) => (
                        <div className='p-col' key={k}>
                            <div className="p-card-text"><b>{userEducation.edu_type}</b> {userEducation.edu_degree}</div>
                            <div className="p-card-text">{userEducation.edu_school}</div>
                            <div className="p-card-text">{userEducation.edu_desc}</div>
                            <br></br>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="p-row">
        <div className="p-col">
            <div className="p-card">
                <div className="p-card-header">Work Experience</div>
                    <div className="p-card-body">
                        {userWork.map((userWork, k) => (
                        <div className='col' key={k}>
                            <div className="p-card-text"><b>{userWork.experience_name} - {userWork.experience_title}</b></div>
                            <div className="p-card-text">{userWork.experience_start} - {userWork.experience_end}</div>
                            <div className="p-card-text">{userWork.experience_desc}</div>
                            <br></br>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="p-row">
        <div className="p-col">
            <div className="p-card">
                <div className="p-card-header">Certifications</div>
                <div className="p-card-body">
                    {userCerts.map((userCerts, k) => (
                    <div className='p-col' key={k}>
                    <div className='p-card'>
                        <div className='p-card-body'>
                            <div className='p-card-text'>{userCerts}</div>
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
