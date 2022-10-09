import Sidebar from "../components/Sidebar";
import { Card, Row, Col, Container } from "react-bootstrap";

import "../index.css";

function Profile() {
    return (
        <div style={{backgroundColor: '#eee'}}>
            <Sidebar/>
            <div className="page">
                <div className="pagecontent">
                    <Container>
                        <Row>
                            <Col lg="4" className="profileCard">
                                <Card>
                                <Card.Body className="profileCardVals">
                                    <Card.Img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                    fluid />
                                    <p>Full Stack Developer</p>
                                    <p>Bay Area, San Francisco, CA</p>
                                </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
}
export default Profile;