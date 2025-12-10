import {Button, Modal, Row, Col, Form} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import Select from 'react-select';

import axios from 'axios';

export default function AddModeratorPop({faculty_id, fetchActivities}) {
    const [show, setShow] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedActivity, setSelectedActivity] = useState("");

    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        const response = await axios.get("http://localhost:3001/categories/active");
        setCategories(response.data);
    }

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, [])

    useEffect(() => {
        if (categories.length >0 && selectedCategory==="") {
            setSelectedCategory(categories[0].category_id);
        }
    }, [categories]);

   useEffect(() => {
        const fetchActivities = async () => {
            if (!selectedCategory) return;

            const response = await axios.get(
                `http://localhost:3001/activities/${selectedCategory}/active`
            );
            const options = response.data.map(a => ({
                value: a.activity_id,
                label: a.activity_name
            }));

            setActivities(options);
            setSelectedActivity(options.length > 0 ? options[0] : null);
        };

        fetchActivities();
    }, [selectedCategory]);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };

    const addModerator = async()=> {
        await axios.post("http://localhost:3001/facultymoderators/add-moderators", {
            activity_moderating_id: selectedActivity.value,
            faculty_id
        }, {withCredentials: true})
        fetchActivities(faculty_id);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedActivity || !selectedCategory) return;
        await addModerator();
        setSelectedActivity("");
        setSelectedCategory(categories[0].category_id);
        handleClose();
    };



    return (
        <>
            <Button variant="dark" onClick={handleShow} className="mb-3">Add Activity</Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add User to Moderate an Activity</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    
                    <Form onSubmit={handleSubmit} className="form-inline">
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
                            <Select 
                                value={selectedActivity}
                                options={activities}
                                onChange={(option)=> {
                                    setSelectedActivity(option)
                                }}
                                isSearchable
                                />
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