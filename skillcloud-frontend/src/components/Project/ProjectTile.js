import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProjectTile = () => {
    const [tileData, setTileData] = useState([]); 

    useEffect(() => {
      const fetchData = async () => {
        const resp = await fetch('http://127.0.0.1:5000/home')
        const data = await resp.json();
        setTileData(data.result);
      };
      fetchData()
    }, []);

    return (
        <div className='container'>
            <div className='row'>
                {tileData.map((tileData, k) => (
                    <div className='col'>
                        <Link to={`/project/${tileData.id}`}>
                            <div className='card' key={k}>
                                <div className='card-header'>{tileData.title}</div>
                                    <div className='card-body'>
                                        {tileData.summary}...
                                    </div>
                                <div className='card-footer'>State: {tileData.state}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ProjectTile
