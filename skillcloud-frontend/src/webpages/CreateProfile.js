import Sidebar from "../components/Sidebar";
import ProfileForm from "../components/ProfileForm";

import { useNavigate } from "react-router-dom";

import "../index.css";

function Home() {
    let navigate = useNavigate(); 
    const handleClick = () =>{ 
        let path = `/`; 
        navigate(path);
    }
    return (
        <div className="app">
            <Sidebar/>
            <div className="page">
                <div className="page-heading">
                    <h1>Create Profile</h1>
                    <button type="button" className="butNeg" onClick={handleClick}>
                        Back to Home
                    </button>
                </div>
                <div className="page-content">
                    <ProfileForm/>
                </div>
            </div>
        </div>
    );
}
export default Home;