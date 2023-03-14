import { useLocation, useNavigate } from 'react-router-dom'

import Sidebar from "../../components/Sidebar"

import "../../index.css";

const CompleteRequest = () => {
    const location = useLocation()
    const { from } = location.state
    let navigate = useNavigate();

    const returnHome = () => {
        navigate("/inbox");
    }
    
    return (
        <div className="app">
            <Sidebar/>
            <div className="msg-page">
                <div className="msg-page-content">
                <div className='msg-container'>
                        <div className='msg-header'>{from === 200 ? "Success!" : from === 403 ? "Unavailable" : "Error"}</div>
                        <div className="msg-body">{from === 200 ? "Your response has been recorded." : from === 403 ? "Sorry this role has been filled by another user." : "Your response has NOT been recorded. Please try again."}</div>
                        <div className="msg-footer">
                            <button onClick={returnHome}>Back to Inbox</button>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );
}
export default CompleteRequest;