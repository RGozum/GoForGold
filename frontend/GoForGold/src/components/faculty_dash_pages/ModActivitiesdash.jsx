import {Container, Col, Row, Form, Button} from "react-bootstrap"
import React, {useEffect, useState} from 'react';
import axios from 'axios';

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
    
    const enrolledStudents = activities.filter((act)=> act.activity_moderating_id === selectedActivity)
                    .flatMap((act)=> act.Activity.Student_Enrollments);
    return (
        <div>
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

            <div className="panel">
                <ul className="ul-style">
                    {enrolledStudents.length >0 ? (
                        enrolledStudents.map((enroll)=> (
                            <li key={enroll.student_id}>
                                <Row>
                                    <Col xs={2} md={2}>{enroll.User.first_name} {enroll.User.last_name}</Col>
                                    <Col xs={2} md={2}>{enroll.approved===null ? (<Button>Test</Button>) : (enroll.approved)}</Col>
                                    <Col xs={2} md={2}>{enroll.points===null ? (<p className="margin-0">No points.</p>) : (enroll.points)}</Col>
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