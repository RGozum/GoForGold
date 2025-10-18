import {Button, Modal, Form} from "react-bootstrap";
import React, {useState} from 'react';

import './AddCategoryPop.css';


export default function AddCategoryPop({categoryAdd}) {
    const [show, setShow] = useState(false);
    const [categoryName,setCategoryName] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setCategoryName("");
        setShow(true); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) return;
        await categoryAdd(categoryName);
        setCategoryName("");
        handleClose();
    }

    return (
        <>
        <Button variant="dark" size="sm" onClick={handleShow} className="add-button">
            + Add Category
        </Button>

        <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Create New Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formCategoryName">
                        <Form.Label>Category Name</Form.Label> 
                        <Form.Control type="text" 
                        placeholder="Enter category name" 
                        value={categoryName || ""}
                        onChange={(e)=> setCategoryName(e.target.value)} />
                    </Form.Group>
                    <Button variant="success" type="submit" className="mt-3 w-100">
                        Add Category
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
        
    );
}