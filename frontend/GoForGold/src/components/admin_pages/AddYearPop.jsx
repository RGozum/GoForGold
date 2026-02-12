import {Button, Modal, Form} from "react-bootstrap";
import React, {useState} from 'react';

import './AddCategoryPop.css';


export default function AddYearPop() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        handleClose();
    }

    return (
        <>
        <Button variant="dark" size="sm" onClick={handleShow} className="add-button">
            + Add Year
        </Button>

        <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Create New Year</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/* <Form.Group controlId="formCategoryName">
                        <Form.Label>Category Name</Form.Label> 
                        <Form.Control type="text" 
                        placeholder="Enter category name" 
                        value={categoryName || ""}
                        onChange={(e)=> setCategoryName(e.target.value)} />
                    </Form.Group> */}
                    <Button variant="success" type="submit" className="mt-3 w-100">
                        Add Year
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
        
    );
}