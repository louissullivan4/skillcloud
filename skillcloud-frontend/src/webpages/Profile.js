import Sidebar from "../components/Sidebar";

import "../index.css";

function Home() {
    return (
        <div>
            <Sidebar/>
            <div className="page">
                <div className="pageheading">
                    <h1>Profile</h1>
                </div>
            </div>
        </div>
    );
}
export default Home;