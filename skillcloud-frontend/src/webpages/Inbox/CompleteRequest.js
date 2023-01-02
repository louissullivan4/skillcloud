import { useLocation, Link } from 'react-router-dom'

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const CompleteRequest = () => {
    // let email = localStorage.user;
    const location = useLocation()
    const { from } = location.state

    return (
        <div className="app">
            <Sidebar/>
            <div className="page">
                <div className="page-content">
                    <div className='container'>
                        <div className='header'>{from === 200 ? "Success!" : from === 403 ? "Unavailable" : "Error"}</div>
                        <div className="body">{from === 200 ? "Your response has been recorded." : from === 403 ? "Sorry this role has been filled by another user." : "Your response has NOT been recorded. Please try again."}</div>
                        <div className="footer">
                            <Link to="/inbox">Back to Inbox</Link>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );
}
export default CompleteRequest;