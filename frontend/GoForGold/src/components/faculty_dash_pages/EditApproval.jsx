import {Button, Modal, Row, Col, Form} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function EditApprovalPop({student_id, activities_id, onUpdate}) {
    const [show, setShow] = useState(false);
 
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true); 
    }

    const handleApprove = async (approved) => {
        await axios.put(`http://localhost:3001/studentenrollment/${student_id}/${activities_id}/approve`, 
            {approved}, {withCredentials: true});
        onUpdate?.();
        handleClose();
    }


    return (
        <>
        <Button variant="dark" size="lg" onClick={handleShow} className="approve-button">
            Edit Approval
        </Button>

        <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static">
            <Modal.Header closeButton>
                Edit Approval
            </Modal.Header>
            <Modal.Body>
                <Row className="text-center">
                <p>Would you like to edit this student's approval?</p>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto"><Button variant="success" onClick={() => handleApprove(true)}>Approve</Button></Col>
                    <Col xs="auto"><Button variant="danger" onClick={() => handleApprove(false)}>Deny</Button></Col>
                </Row>
            </Modal.Body>
        </Modal>
        </>
        
    );
}