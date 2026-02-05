import React, {useState, useEffect} from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { Button, Form, Row, Col } from 'react-bootstrap';
import YearsEditPanel from './YearsEditPanel.jsx';
import './ScrollablePanel.css'; 

export default function YearsPanel() {
    const [years, setYears]=useState([]);

    const fetchYears = async() => {
        const response = await axios.get('http://localhost:3001/schoolyears');
        setYears(response.data);
    };

    useEffect(()=> {
        fetchYears();
    }, []);

    return (
        <div className="scrollable-panel-long">
            <h2 className='title'>Years</h2>
            <ul className="ul-style">
                {years.map((year)=> (
                    <li key={year.year_id}>
                        <Row>
                            <Col xs={3} md={3} className="year-name"><h3>{year.name}</h3></Col>
                            <Col><YearsEditPanel year_id={year.year_id}/></Col>
                            <Col xs={3} md={3}><Button variant="dark">Set Active</Button></Col>
                        </Row>
                    </li>
                ))}
            </ul>
        </div>
    );
}