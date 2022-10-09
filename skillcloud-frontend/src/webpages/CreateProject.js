import Sidebar from "../components/Sidebar";
import ProjectForm from "../components/ProjectForm";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";

function Home() {
    let navigate = useNavigate(); 
    const handleClick = () =>{ 
        let path = `/`; 
        navigate(path);
    }
    return (
        <div className="App">
            <Sidebar/>
            <div className="page">
                <div className="pageheading">
                    <h1>Create Project</h1>
                    <Button type="button" className="but-neg" onClick={handleClick}>
                        Back to Home
                    </Button>
                </div>
                <div className="pagecontent">
                    <ProjectForm/>
                </div>
            </div>
        </div>
    );
}
export default Home;