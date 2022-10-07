import Sidebar from "../components/Sidebar";
import ProjectForm from "../components/ProjectForm";


import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";

function Home() {
    return (
        <div className="App">
            <Sidebar/>
            <div className="page">
                <div className="pageheading">
                    <h1>Create Project</h1>
                </div>
                <div className="pagecontent">
                    <ProjectForm/>
                </div>
            </div>
        </div>
    );
}
export default Home;