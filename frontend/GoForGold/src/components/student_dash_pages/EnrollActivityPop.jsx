import {Button, Modal, Form, Row, Col} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function EnrollActivityPop({enrollActivity}) {
    const [show, setShow] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedActivity, setSelectedActivity] = useState("");

    const [searchActivity, setSearchActivity]=useState("");
    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        const response = await axios.get("http://localhost:3001/categories/active");
        setCategories(response.data);
    }

    const [activities, setActivities] = useState([]);
    const fetchActivities = async(cat_id) => {
        if (!cat_id) return;
        const response = await axios.get(`http://localhost:3001/activities/${cat_id}/active`);
        setActivities(response.data);
    }

    const filteredActivities = activities.filter(act=>
        act.activity_name.toLowerCase().includes(searchActivity.toLowerCase())
    )


    useEffect(() => {
        fetchCategories();
    }, [])

    useEffect(() => {
        if (categories.length >0 && selectedCategory==="") {
            setSelectedCategory(categories[0].category_id);
        }
    }, [categories])

    useEffect(()=> {
        if (!selectedCategory) return;
        fetchActivities(selectedCategory);
    }, [selectedCategory]);

    useEffect(()=> {
    if (activities.length > 0 && !selectedActivity) {
        setSelectedActivity(activities[0].activity_id);
    }
    }, [activities]);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedActivity || !selectedCategory) return;
        await enrollActivity(selectedActivity);
        setSelectedActivity("");
        setSelectedCategory(categories[0].category_id);
        handleClose();
    }

    return (
        <>
            <Button onClick={handleShow}>Add Activity</Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add Activity</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    
                    <Form onSubmit={handleSubmit} className="form-inline">
                         <Row>
                            <Col></Col>
                            <Col xs={5}>
                            <Form.Group className="mt-2">
                            <Form.Control 
                            type ="text"
                            placeholder="Search..."
                            value={searchActivity}
                            onChange={(e)=>setSearchActivity(e.target.value)} />
                        </Form.Group>
                            </Col>
                         </Row>
                         
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select value={selectedCategory} onChange={(e)=> setSelectedCategory(Number(e.target.value))}>
                                {categories.map((cat)=> (
                                    <option key={cat.category_id} value={cat.category_id}>
                                        {cat.category_name}
                                    </option>
                                ))}                            
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mt-2">
                            <Form.Label>Activities in Category</Form.Label>
                            <Form.Select value={selectedActivity} onChange={(e)=>setSelectedActivity(Number(e.target.value))}>
                                {filteredActivities.length>0 ? (
                                    filteredActivities.map((act)=> (
                                        <option key={act.activity_id} value={act.activity_id}>
                                        {act.activity_name}
                                        </option> 
                                    ))
                                ): (<option disabled>No matching activities</option>)}
                            </Form.Select>
                        </Form.Group>

                        <Button variant="success" type="submit" className="mt-3 w-100">
                            Add
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        
        </>
    )
    
}