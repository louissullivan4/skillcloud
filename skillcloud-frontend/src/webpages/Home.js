import Sidebar from "../components/Sidebar";
import ProjectTile from "../components/ProjectTile";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";

function Home() {
    let navigate = useNavigate(); 
    const handleClick = () =>{ 
        let path = `/createproject`; 
        navigate(path);
    }
    return (
        <div className="App">
            <Sidebar/>
            <div className="page">
                <div className="pageheading">
                    <h1>Home</h1>
                    <Button type="button" className="but-pos" onClick={handleClick}>
                        Create Project
                    </Button>
                </div>
                <div className="pagecontent">
                    <ProjectTile/>
                </div>
            </div>
        </div>
    );
}
export default Home;