import Sidebar from "../components/Sidebar";
import ProjectTile from "../components/ProjectTile";

import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";

function Home() {
    return (
        <div className="App">
            <Sidebar/>
            <div className="page">
                <div className="pageheading">
                    <h1>Home</h1>
                </div>
                <div className="pagecontent">
                    <ProjectTile/>
                </div>
            </div>
        </div>
    );
}
export default Home;