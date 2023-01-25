import { useLocation, useNavigate, Link } from 'react-router-dom'

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const MsgNoUsers = () => {
    // let email = localStorage.user;
    let navigate = useNavigate();
    const location = useLocation()
    const { from } = location.state

    const handleClick = () => {
        navigate("/inbox");
    }
    
    return (
        <div className="app">
            <Sidebar/>
            <div className="msg-page">
                <div className="msg-page-content">
                    <div className='msg-container'>
                        <div className='msg-header'>No users</div>
                        <div className="msg-body">There are currently no users that fill the requirements of the role titled {from.roles_title + " "}
                             for the project: <Link to={"/project/"+from.project_id}>Project Id: {from.project_id}</Link>
                        </div>
                        <div className="msg-footer">
                            <button onClick={handleClick}>Back to Inbox</button>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );
}
export default MsgNoUsers;