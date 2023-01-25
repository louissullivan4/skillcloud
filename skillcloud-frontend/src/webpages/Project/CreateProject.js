import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import ProjectForm from "../../components/Project/ProjectForm";

import "../../index.css";

function Home() {
    return (
        <div className="app">
            <Sidebar/>
            <div className="project">
                <div className="project-heading">
                    <div className="project-heading-title">
                        <h1>Create Project</h1>
                    </div>
                </div>
                <div className="project-body">
                    <ProjectForm/>
                </div>
            </div>
        </div>
    );
}
export default Home;