import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Pagination from "../components/Project/Pagination";

import "../index.css";

const Home = () => {
    let navigate = useNavigate(); 
    const handleClick = () =>{ 
        let path = `/createproject`; 
        navigate(path);
    }

    const [tileData, setTileData] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [tilesPerPage] = useState(12);

    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://127.0.0.1:5000/home')
        const data = await resp.json();
        setTileData(data.result);
      };
      fetchData()
    }, []);

    const indexOfData= currentPage * tilesPerPage;
    const indexOfFData = indexOfData - tilesPerPage;
    const curData = tileData.slice(indexOfFData, indexOfData);
    const nPages = Math.ceil(tileData.length / tilesPerPage)

    return (
        <div className="app">
            <Sidebar/>
            <div className="page">
                <div className="page-heading">
                    <h1>Home</h1>
                    <button type="button" onClick={handleClick}>
                        Create Project
                    </button>
                </div>
                <div className="home-page">
                    <div className='card-wrapper'>
                        {curData.map((tileData, k) => (
                            <div className='card' key={k}>
                                <Link to={`/project/${tileData.id}`} style={{textDecoration: "none"}}>
                                        <div className='card-header'>{tileData.title}</div>
                                            <div className='card-body'>
                                                {tileData.summary}...
                                            </div>
                                    {tileData.state === 'Open' ? <div className="card-footer" style={{color: "green"}}>State: {tileData.state}</div> : <div className="card-footer" style={{color: "red"}}>State: {tileData.state}</div>}
                                </Link>
                            </div>
                            ))}
                        </div>
                    </div>
                <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
            </div>
        </div>
    );
}
export default Home;