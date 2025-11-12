import {Container, Col, Row, Form, Button, ButtonGroup} from "react-bootstrap"
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ApprovalPop from './ApprovalPop';
import './FacultyDash.css';

export default function ModActivitiesDash() {
    const [selectedActivity, setSelectedActivity]=useState("");

    const [activities, setActivities] = useState([]);

    const fetchActivities = async() => {
        const response = await axios.get("http://localhost:3001/facultymoderators/activities", 
            {withCredentials: true});
        console.log(response.data);
        setActivities(response.data);
    }

    useEffect(() => {
        fetchActivities();
    }, [])
    
    const enrolledStudents = activities.filter((act)=> act.activity_moderating_id === selectedActivity).flatMap((act)=> act.Activity.Student_Enrollments);
    
    
    return (
        <div>
            <Row>
                <Col xs={3}>
                    <Form className="form-inline">
                    <Form.Group className="mb-3">
                    <Form.Select value={selectedActivity} onChange={(e)=> setSelectedActivity(Number(e.target.value))}>
                        <option value="">Select an Activity</option>
                        {activities.map((act)=> (
                            <option key={act.activity_moderating_id} value={act.activity_moderating_id}>
                                {act.Activity.activity_name}
                            </option>
                        ))}
                    </Form.Select>
                    </Form.Group>
            </Form>
                </Col>
            </Row>
            

            <div className="panel">
                <ul className="ul-style">
                    {enrolledStudents.length >0 ? (
                        enrolledStudents.map((enroll)=> (
                            <li key={enroll.student_id} >
                                <Row className="align-items-center text-center">
                                    <Col xs={3} md={3} className="text-center name-item">{enroll.User.first_name} {enroll.User.last_name}</Col>
                                    <Col xs={3} md={3}>{enroll.approved===null ? (
                                        <ApprovalPop student_id={enroll.student_id} activities_id={enroll.activities_id} onUpdate={fetchActivities}/>) : 
                                        enroll.approved === true ? (
                                        <div className="name-item">Approved</div>) : (
                                        <div className="name-item">Denied</div>)}
                                    </Col>
                                    <Col xs={3} md={3} className="points-item">
                                    <ButtonGroup className="mb-3 gap-3 justify-content-center">
                                        <Button>^</Button>
                                        <span className="text-center">{enroll.points}</span>
                                        <Button>v</Button>
                                    </ButtonGroup>
                                    </Col>
                                </Row>
                            </li>
                        ))
                        
                    ): (
                    <li> 
                        No students are enrolled.
                    </li>)}
                    
                </ul>
            </div>


        </div>
    )
}