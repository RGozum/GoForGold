import {Button, Modal, Form} from "react-bootstrap";
import React, {useState, useEffect} from 'react';

export default function RemoveActivityPop({activities_id, handleDelete}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleDelete(activities_id);
        handleClose();
    }
    
    
    return (
        <>
            <Button variant="dark" size="md" onClick={handleShow} className="delete-button">&times;</Button> 

            <Modal 
                show={show}
                onHide={handleClose}
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Remove Activity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to remove this activity?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>No</Button>
                    <Button variant="primary" onClick={handleSubmit}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}