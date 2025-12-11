import {Container, Col, Row, Form, Button, ButtonGroup} from "react-bootstrap"
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ApprovalPop from './ApprovalPop';
import EditApprovalPop from './EditApproval';
import './FacultyDash.css';

export default function ModActivitiesDash() {
    const [selectedActivity, setSelectedActivity]=useState("");

    const [activities, setActivities] = useState([]);

    const fetchActivities = async() => {
        const response = await axios.get("http://localhost:3001/facultymoderators/activities", 
            {withCredentials: true});
        setActivities(response.data);
    }

    useEffect(() => {
        fetchActivities();
    }, [])
    
    const enrolledStudents = activities.filter((act)=> act.activity_moderating_id === selectedActivity).flatMap((act)=> act.Activity.Student_Enrollments);
    
    const addPoints = async(student_id, activities_id, currentPoints) => {
        let point=currentPoints+1;
        if (point>5) {
            point=5
        }
        const response = await axios.put(`http://localhost:3001/studentenrollment/${student_id}/${activities_id}/editpoints`, {point}, {withCredentials:true});
        fetchActivities();
    }

    const minusPoints = async(student_id, activities_id, currentPoints) => {
        let point=currentPoints-1;
        if (point<0) {
            point=0
        }
        const response = await axios.put(`http://localhost:3001/studentenrollment/${student_id}/${activities_id}/editpoints`, {point}, {withCredentials:true});
        fetchActivities();
    }



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
                                    <ButtonGroup className="gap-3 justify-content-center">
                                        <Button variant="outline-dark" disabled={enroll.approved==!true} onClick={()=>addPoints(enroll.student_id, enroll.activities_id, enroll.points)}>^</Button>
                                        <div>
                                            {enroll.approved==!true ? (<p>Not approved.</p>) : (<p>{enroll.points} points.</p>)}
                                        </div>
                                        <Button variant="outline-dark" disabled={enroll.approved==!true} onClick={()=>minusPoints(enroll.student_id, enroll.activities_id, enroll.points)}>v</Button>
                                    </ButtonGroup>
                                    </Col>
                                    <Col xs={2} md={2} >
                                        <EditApprovalPop student_id={enroll.student_id} activities_id={enroll.activities_id} onUpdate={fetchActivities}/>
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