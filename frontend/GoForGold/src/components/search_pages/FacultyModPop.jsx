import {Button, Modal, Row, Col, Form} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function FacultyModPop({faculty_id, activity_moderating_id, fetchActivities}) {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);
 
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true); 
    };

    const deleteModerator = async()=> {
        await axios.delete(`http://localhost:3001/facultymoderators/${faculty_id}/${activity_moderating_id}/delete-mod`, {withCredentials: true});
        fetchActivities(faculty_id);
    };

    return (
        <>
        <Button variant="dark" size="md" onClick={handleShow}>
            Delete
        </Button>

        <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static">
            <Modal.Header closeButton>
                Delete Faculty Moderator
            </Modal.Header>
            <Modal.Body>
                <Row className="text-center">
                <p>Would you like to delete this activity? </p>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto"><Button variant="danger" onClick={() => handleClose()}>Deny</Button></Col>
                    <Col xs="auto"><Button variant="success" onClick={() => deleteModerator()}>Confirm</Button></Col>
                </Row>
            </Modal.Body>
        </Modal>
        </>
        
    );
}