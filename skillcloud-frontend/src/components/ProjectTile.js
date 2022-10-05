import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

function ProjectTile() {
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
        <Container style={{ position: "absolute"}}>
            <Row>
                {tileData.map((tileData, k) => (
                    <Col key={k} xs={12} md={6} lg={3}>
                        <Link style={{textDecoration: "none"}} to={`/project/${tileData.id}`}>
                        <Card
                            style={{ height: '15em', width: '19em', margin: '1em'}}
                            border={tileData.state === 'Open' ? 'success' : 'danger'}
                            text='primary'>
                            <Card.Header style={{color: "black"}}>{tileData.title}</Card.Header>
                                <Card.Body style={{color: "black"}}>
                                    <Card.Text>{tileData.summary}...</Card.Text>
                                </Card.Body>
                            <Card.Footer style={{color: "black"}}>State: {tileData.state}</Card.Footer>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
export default ProjectTile
