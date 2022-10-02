import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import "../index.css";

function Home() {
    const authenticated = localStorage.getItem("authenticated") || false;
    const [auth, setauth] = useState(authenticated);
    useEffect(() => {
        setauth(authenticated);
    }, [authenticated]);
    console.log(auth);
    if (!auth) {
        console.log("not authenticated");
        return <Navigate replace to="/loginform" />;
    } else {
    return (
        <div className="App">
            <Sidebar/>
            <h1>Home</h1>
        </div>
    );}
}
export default Home;