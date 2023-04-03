import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom';

const ProfileTabs = () => {
    let email = useParams()
    let email1 = email.email
    const [userData, setUserData] = useState([]);
    const [userCurrentProject, setCurrentProject] = useState([]);
    const [userPrevProjects, setUserPrevProjects] = useState([]);
    const [userCerts, setUserCerts] = useState([]);
    const [userEducation, setUserEducation] = useState([]);
    const [userWork, setUserWork] = useState([]);
    const [ownedProjects, setOwnedProjects] = useState([]);
    const hasFetchedData = useRef(false);

    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://scbackend-env.eba-imjep3am.eu-north-1.elasticbeanstalk.com/profile/'+email.email)
        const data = await resp.json();
        setUserData(data.result[0]);

        const certs = data.result[0].certifications
        setUserCerts(certs)

        const education = data.result[0].education
        setUserEducation(education)
                
        const work = data.result[0].work_experience
        setUserWork(work)

        const cproject = data.result[0].current_projects
        console.log(data.result)
        setCurrentProject(data.result[0].current_projects);

        const oproject = data.result[0].owned_projects
        setOwnedProjects(oproject);

        const pprojects = data.result[0].previous_projects
        setUserPrevProjects(pprojects);
        
      };
      if (hasFetchedData.current === false) {
        fetchData();
        hasFetchedData.current = true;
      } 
    }, []);

    async function leaveProject(pid) {
        let projectjson = await fetch('http://scbackend-env.eba-imjep3am.eu-north-1.elasticbeanstalk.com/leaveproject/'+email.email+'/'+pid)
        .then(() => {
            alert("You have left the project.");
        })
        fetch(`http://scbackend-env.eba-imjep3am.eu-north-1.elasticbeanstalk.com/eventmatch`,{'method':'POST', headers : {'Content-Type':'application/json'}, body: JSON.stringify(projectjson)})
    }


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
                        {userCurrentProject.length < 1 ? <div className="p-card-body">No active projects 😓</div> : 
                            userCurrentProject.map((userCurrentProject, k) => (
                            <div className="p-card-body" key={k}>
                                <Link to={`/project/${userCurrentProject.project_id}`}>
                                    <div className='p-card'>
                                        <div className='p-card-header'>{userCurrentProject.project_title}</div>
                                        <div className='p-card-body'>
                                            <div className='p-card-text'>{userCurrentProject.project_summary}...</div>
                                        </div>
                                    </div>
                                </Link>
                                <button className="leave-button" onClick={() => leaveProject(userCurrentProject.project_id)}>Leave</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="p-row">
                <div className="p-col">
                    <div className="p-card">
                        <div className="p-card-header">Project Owned</div>
                        {ownedProjects === null ? <div className="p-card-body">No owned projects 😓</div> :
                            ownedProjects.map((owned, k) => (
                            <div className="p-card-body" key={k}>
                                <Link to={`/project/${owned.project_id}`}>
                                    <div className='p-card'>
                                        <div className='p-card-header'>{owned.project_title}</div>
                                        <div className='p-card-body'>
                                            <div className='p-card-text'>{owned.project_summary}...</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
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
                                <Link to={`/project/${userPrevProjects.project_id}`}>
                                <div className='p-card'>
                                    <div className='p-card-header'>{userPrevProjects.project_title}</div>
                                    <div className='p-card-body'>
                                        <div className='p-card-text'>{userPrevProjects.project_summary}...</div>
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
                            <div className='p-card-text'>{userCerts.certName}</div>
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
