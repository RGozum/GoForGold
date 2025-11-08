import { Container, Col, Row, ProgressBar, Button} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './ActivitiesDash.css';

import RemoveActivityPop from "./RemoveActivityPopUp";
import EnrollActivityPop from "./EnrollActivityPop";

export default function ActivitiesDash() {

    const [activities, setActivities] = useState([]);

    const fetchActivities = async() => {
        const response = await axios.get("http://localhost:3001/studentenrollment/enrolledactivities", 
        {withCredentials: true});
        setActivities(response.data);
    }

    useEffect(() => {
        fetchActivities();
    }, []);

    const onEnroll = async(activities_id) => {
        const response = await axios.post("http://localhost:3001/studentenrollment/enroll", {
            activities_id,
        }, {withCredentials: true});
        fetchActivities();
        fetchPoints();
    }

    const onDelete = async (activities_id) => {
        await axios.delete(`http://localhost:3001/studentenrollment/${activities_id}/delete`,{
            withCredentials: true,
        });

        setActivities((prev)=> {
            const updatedActivities = prev.filter((act)=>
            Number(act.activities_id) !== Number(activities_id)
        );
            return updatedActivities
        });
        fetchPoints();
    }

    const [points, setPoints] = useState("");

    const fetchPoints = async() => {
        const response = await axios.get("http://localhost:3001/studentenrollment/points", {
            withCredentials: true,
        });
        console.log(response.data.points);
        setPoints(response.data.points || 0);
    }

    useEffect(()=> {
        fetchPoints();
    }, []);

    
    const now = (points/40)*100;

    return (
        <div>
            <Row className="mb-3">
            <Col xs="7" lg="7">
                <ProgressBar now={now} label={`${now}%`} striped animated variant="success" style={{height: "35px"}} />
            </Col>
            <Col xs="3" lg="3"></Col>
            <Col>
                <EnrollActivityPop enrollActivity={onEnroll}/>
            </Col>
            </Row>
            <div className="panel">
                <h3>Your Activities</h3>
                <ul className="ul-style">
                      {activities.map((act) => (
                        <li key={act.activities_id}>
                            <Row className="act-cat">
                                <Col xs={2} md={2} className="category-item">{act.Activity.Category.category_name}</Col>
                                <Col xs={2} md={2} className="activity-item">{act.Activity.activity_name}</Col>
                                <Col xs={2} md={2}  className="points-item">{act.approved===null ? (<p>Not approved.</p>) : (act.points + " points")}</Col>
                                <Col xs={2} md={4}><RemoveActivityPop 
                                   activities_id={act.activities_id} handleDelete={onDelete} /> </Col>
                            </Row>
                        </li>  
                        ))}
                </ul>
            </div>

        </div>
        
    );
}
