import Sidebar from "../components/Sidebar";
import ProjectTile from "../components/Project/ProjectTile";

import { useNavigate } from "react-router-dom";

import "../index.css";

const Home = () => {
    let navigate = useNavigate(); 
    const handleClick = () =>{ 
        let path = `/createproject`; 
        navigate(path);
    }
    return (
        <div className="app">
            <Sidebar/>
            <div className="page">
                <div className="page-heading">
                    <h1>Home</h1>
                    <button type="button" className="but-pos" onClick={handleClick}>
                        Create Project
                    </button>
                </div>
                <div className="page-content">
                    <ProjectTile/>
                </div>
            </div>
        </div>
    );
}
export default Home;