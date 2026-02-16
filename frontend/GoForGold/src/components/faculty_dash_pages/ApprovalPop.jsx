import {Button, Modal, Row, Col, Form} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function AddActivityPop({student_id, activities_id, onUpdate, year_id}) {
    const [show, setShow] = useState(false);
 
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true); 
    }

    const handleApprove = async (approved) => {
        await axios.put(`http://localhost:3001/studentenrollment/${student_id}/${activities_id}/approve`, 
            {approved}, {withCredentials: true});
        onUpdate(year_id);
        handleClose();
    }

    const [activeYear, setActiveYear]=useState("");
    const fetchActiveYear = async() => {
        const response = await axios.get("http://localhost:3001/schoolyears/activeyear", {withCredentials: true});
        setActiveYear(response.data);
    }

    useEffect(() => {
        fetchActiveYear();
    }) 


    return (
        <>
        <Button variant="dark" size="lg" lg={3} onClick={handleShow} disabled={activeYear!=year_id} className="approve-button">
            Approve/Deny
        </Button>

        <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static">
            <Modal.Header closeButton>
                Approve this Student
            </Modal.Header>
            <Modal.Body>
                <Row className="text-center">
                <p>Would you like to approve this student?</p>
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