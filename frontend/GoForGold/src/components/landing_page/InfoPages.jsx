import {Container, Col, Card, Row, Table} from 'react-bootstrap';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <>
    <Row className="mt-3">
        <Col>
            <Card>
            <Card.Body>
                <Card.Title>
                    Gold and White Award
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">What is the Gold and White Award?</Card.Subtitle>
                <Card.Text>
                    The purpose of this award is to recognize students who embody the school's motto of KNOWLEDGE, COMMITMENT, INVOLVEMENT. It recognizes those who participate in curricular and extrcurricular activities with merit.
                    Students must earn a total of 40 points during one school year. A minimum number of points is required in certain categories. The balance of points may be from the student's choice of activities. 
                    In any category, a maximum of 10 points will be counted for the student's choice of activities.
                </Card.Text>
            </Card.Body>
            </Card>
        </Col>
        <Col>
            
        </Col>
    </Row>

    <Row className="mt-3 p-3">
        <Col>
            
        </Col>
        <Col>
            <Card>
            <Card.Body>
                <Card.Title>
                    Award's Requirements
                </Card.Title>
                <Card.Text>
                    <p>These are the requirements for the award:</p>
                    <Container className="border">
                        <Row>
                            <Col className="border">
                                <h6>1. Athletics</h6>
                                <p className="m-0">Team Member - 5</p>
                                <p className="m-0">Team Manager - 5</p>
                                <p className="m-0">Cheerleader / Dance Team - 5</p>
                                
                            </Col>
                            <Col className="border">
                                <h6>6. Scholarship</h6>
                                <p className="m-0">Honor Roll (per term) - 5</p>
                                <p className="m-0">Student of the Month - 5</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="border">
                                <h6>2. Clubs</h6>
                                <p className="m-0">Service - 5</p>
                                <p className="m-0">Social / Academic - 3</p>
                            </Col>
                            <Col className="border">
                                <h6>7. Service to SJVHS</h6>
                                <p className="m-0">SJV Student Event / Activity (set up, break down) - 3</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="border">
                                <h6>3. Fundraising</h6>
                                <p className="m-0">Class Treasury - 3</p>
                                <p className="m-0">SJV Event - 3</p>
                                <p className="m-0">Walk-a-Thon per $55 - 3</p>
                            </Col>
                            <Col className="border">
                                <h6>8. Student Government</h6>
                                <p className="m-0">Cabinet Officer - 5</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="border">
                                <h6>4. Drama/Musical (per season)</h6>
                                <p className="m-0">Member (all roles/positions) - 5</p>
                            </Col>
                            <Col className="border">
                                <h6>9. National Honor Society</h6>
                                <p className="m-0">Member for 1 full year - 5</p>
                                <p className="m-0">Other SJV Honor Societies - 3</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="border">
                                <h6>5. Academic Competition Team</h6>
                                <p className="m-0">Entrepreneur Team / Mock Trial, and others - 3</p>
                            </Col>
                            <Col className="border">
                                <h6>10. Liturgical Ministry</h6>
                                <p className="m-0">Member (all roles & positions) - 5</p>
                            </Col>
                        </Row>


                    </Container>
                </Card.Text>
            </Card.Body>
            </Card>
        </Col>
    </Row>
    
    
    </>
  );
}

