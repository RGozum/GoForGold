import {Button, Modal, Form} from "react-bootstrap";
import React, {useState, useEffect} from 'react';

import './AddCategoryPop.css';


export default function AddActivityPop({categories, onAdd}) {
    const [show, setShow] = useState(false);
    const [activityName,setActivityName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("")
    
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setActivityName("");
        setShow(true); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!activityName.trim() || !selectedCategory) return;
        onAdd(activityName, selectedCategory);
        setActivityName("");
        setSelectedCategory("");
        handleClose();
    }
    return (
        <>
        <Button variant="dark" size="sm" onClick={handleShow} className="add-button">
            + Add Activity
        </Button>

        <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Create New Activity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select value={selectedCategory} onChange={(e)=> setSelectedCategory(Number(e.target.value))}>
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.category_id} value={cat.category_id}>
                                        {cat.category_name}
                                    </option>
                                ))}
                            </Form.Select>
                </Form.Group>

                <Form.Group>
                     <Form.Label>Activity Name</Form.Label> 
                        <Form.Control type="text" 
                        placeholder="Enter activity name" 
                        value={activityName }
                        onChange={(e)=> setActivityName(e.target.value)} />
                    </Form.Group>
                   
                    <Button variant="success" type="submit" className="mt-3 w-100">
                        Add Activity
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
        
    );
}