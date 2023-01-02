import { useLocation, Link } from 'react-router-dom'

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const MsgNoUsers = () => {
    // let email = localStorage.user;
    const location = useLocation()
    const { from } = location.state
    console.log(from)
    return (
        <div className="app">
            <Sidebar/>
            <div className="page">
                <div className="page-content">
                    <div className='container'>
                        <div className='header'>Sorry !</div>
                        <div className="body">There are currently no users that fill the requirements of the role titled {from.roles_title + " "}
                             for the project: <Link to={"/project/"+from.project_id}>Project Id: {from.project_id}</Link>
                        </div>
                        <div className="footer">
                            <Link to="/inbox">Back to Inbox</Link>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );
}
export default MsgNoUsers;