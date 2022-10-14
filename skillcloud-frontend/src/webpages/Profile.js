import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import Sidebar from "../components/Sidebar";

import "../index.css";

function Profile() {
    localStorage.setItem("username", "sullivanlouis0@gmail.com");
    let email = "sullivanlouis0@gmail.com"
    const [userData, setUserData] = useState([]);
    const [userProjects, setUserProjects] = useState([]);
    const [userCerts, setUserCerts] = useState([]);
    // let navigate = useNavigate();
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
    const imageName = "louis";
    const link = "../assets/profiles/" + imageName + ".jpg";

    const [active, setActive] = useState(tabsList[0]);
    const tabsList = [ "Previous Roles", "Education", "Projects", "Certifications"];

    return (
        <div className="app">
            <Sidebar/>
            <div className="page">
                <div className="page-content">
                    <div className="container-1">
                        <div className="row">
                            <div className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-image"><img src={link} alt="Louis"/></div>
                                        <div className="card-text">{userData.fname} {userData.lname}</div>
                                        <div className="card-text">{userData.job_title}</div>
                                        <div className="card-text">{userData.email}</div>
                                        <div className="card-text">{userData.availability}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-2">
                        <div className="row">
                            <div className="col">
                                <div className="card">
                                    <div className="card-header">Summary</div>
                                    <div className="card-body">
                                        <div className="card-text">{userData.job_desc}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-3">
                        <div className="tab1">
                            <div className="row">
                                <div className="col">
                                    <div className="card">
                                        <div className="card-header">Previous Roles</div>
                                        <div className="card-body">
                                            <div className="card-text">{userData.previous_roles}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab2">
                            <div className="row">
                                <div className="col">
                                    <div className="card">
                                        <div className="card-header">Education</div>
                                        <div className="card-body">
                                        <div className="card-text">{userData.edu_name}</div>
                                        <div className="card-text">{userData.edu_school}</div>
                                        <div className="card-text">{userData.edu_summary}</div>
                                        </div>
                                    </div>
                                </div>
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
                                                                    {userProjects.summary}...
                                                                </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card">
                                        <div className="card-header">Certifications</div>
                                        <div className="card-body">
                                            {userCerts.map((userCerts, k) => (
                                                <div className='col' key={k}>
                                                    <div className='card'>
                                                            <div className='card-body'>
                                                                {userCerts}
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
                </div>
            </div>
        </div>
    );
}
export default Profile;