import { Container, Col, Row, ProgressBar, Form } from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './ActivitiesDash.css';

export default function ActivitiesDash() {

    const [categories, setCategories] = useState([]);
    const [activities, setActivities] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("");
    
    const fetchCategories = async() => {
        const response = await axios.get("http://localhost:3001/categories", { withCredentials: true });
        setCategories(response.data);
    };
    useEffect(() => {
        fetchCategories();
    }, []);
    
    const points = 40;
    const now = (points/40)*100;

    return (
        <div>
        <Container fluid>
        <Col className="mb-3">
            <ProgressBar now={now} label={`${now}%`} striped animated variant="success"/>
        </Col>
            <Col className="d-flex align-items-center panel">
            <h3>Your Activities</h3>
            <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(Number(e.target.value))} className="mb-2 w-25 ms-auto">
                <option value="">Select a category</option>
                {categories.map((cat)=> (
                    <option key = {cat.category_id} value={cat.category_id}>
                        {cat.category_name}
                    </option>
                ))}
            </Form.Select>
            </Col>

            
        </Container>

        </div>
        
    )
}