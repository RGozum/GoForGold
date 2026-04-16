import { Container, Col, Row, ProgressBar, Button, Form} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './ActivitiesDash.css';

import RemoveActivityPop from "./RemoveActivityPopUp";
import EnrollActivityPop from "./EnrollActivityPop";

export default function ActivitiesDash() {

    const [activities, setActivities] = useState([]);

    const [years, setYears] = useState([]);
    const fetchYears = async() => {
        const response = await axios.get("http://localhost:3001/schoolyears", {withCredentials: true});
        console.log(response.data);
        setYears(response.data);
    }

    const [selectedYear, setSelectedYear]=useState("");
    const fetchActiveYear = async() => {
        const response = await axios.get("http://localhost:3001/schoolyears/activeyear", {withCredentials: true});
        console.log(response.data);
        setSelectedYear(response.data);
    }

    const fetchActivities = async(year_id) => {
        const response = await axios.get(`http://localhost:3001/studentenrollment/enrolledactivities/${year_id}`, 
        {withCredentials: true});
        console.log(response.data);
        setActivities(response.data);
    }

    useEffect(() => {
        fetchYears();
        fetchActiveYear();
    }, []);

    const onEnroll = async(activities_id) => {
        if (activities.some(act => act.activities_id === activities_id)) {
        alert("Student is already enrolled in this activity");
        return;
    }
        const response = await axios.post("http://localhost:3001/studentenrollment/enroll", {
            activities_id,
        }, {withCredentials: true});
        fetchActivities(selectedYear);
        fetchPoints(selectedYear);
    }

    const onDelete = async (activities_id, year_id) => {
        await axios.delete(`http://localhost:3001/studentenrollment/${activities_id}/${year_id}/delete`,{
            withCredentials: true,
        });

        setActivities((prev)=> {
            const updatedActivities = prev.filter((act)=>
            Number(act.activities_id) !== Number(activities_id)
        );
            return updatedActivities
        });
        fetchPoints(selectedYear);
    }

    const [points, setPoints] = useState("");

    const fetchPoints = async(year_id) => {
        const response = await axios.get(`http://localhost:3001/studentenrollment/points/${year_id}`, {
            withCredentials: true,
        });
        setPoints(response.data.points || 0);
    }

    useEffect(()=> {
        fetchPoints(selectedYear);
    }, [selectedYear]);

    useEffect(() => {
        if (!selectedYear) return;
        fetchActivities(selectedYear);
    }, [selectedYear]);
    
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
            <Row className="mb-3">
                <Col xs="3" lg="3">
                <Form.Select value={selectedYear} onChange={(e)=>setSelectedYear(Number(e.target.value))}>
                    <option value="">Select a Year</option>
                        {years.map((year)=> (
                            <option key ={year.year_id} value={year.year_id}>
                                {year.name}
                            </option>
                        ))}
                </Form.Select>
                </Col>
            </Row>
            <div className="panel">
                <h3>Your Activities</h3>
                <ul className="ul-style">
                      { activities.length > 0? ( 
                        activities.map((act) => (
                        <li key={act.activities_id}>
                            <Row className="act-cat">
                                <Col xs={2} md={2} className="category-item">{act.Activity.Category.category_name}</Col>
                                <Col xs={2} md={2} className="activity-item">{act.Activity.activity_name}</Col>
                                <Col xs={2} md={2}  className="points-item">{act.approved===null || act.approved === false ? (<p>Not approved.</p>) : (act.points + " points")}</Col>
                                <Col xs={2} md={4}><RemoveActivityPop 
                                   activities_id={act.activities_id} handleDelete={onDelete} year_id={selectedYear} /> </Col>
                            </Row>
                        </li>  
                        ))

                      ) : (
                        <li>
                            You are not enrolled in any activities.
                        </li>
                      )}
                      
                      
                      
                </ul>
            </div>

        </div>
        
    );
}
