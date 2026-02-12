import {Button, Modal, Form, Row, Col} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import axios from 'axios';


import './AddCategoryPop.css';

export default function SetActivePanel({year_id, refreshYears}) {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true); 
    }

    const activeYear = async(year_id) => {
        try {
            const response = await axios.put(`http://localhost:3001/schoolyears/${year_id}/active`, {}, {withCredentials: true});
            console.log(response.data);
            refreshYears();
            handleClose();
        } catch(err) {
            console.error("There is an error updating the year "+err);
            handleClose();
        }
    }

    const inactiveYear = async(year_id) => {
        try {
            const response = await axios.put(`http://localhost:3001/schoolyears/${year_id}/archive`, {}, {withCredentials: true})
            console.log(response.data);
            refreshYears();
            handleClose();
        } catch (err) {
            console.error("There is an error updating the year:" +err );
            handleClose();
        }
    }

    return (
        <>
        <Button variant="dark" size="lg" onClick={handleShow} className="ms-5">
            Set Active Year
        </Button>

        <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Edit Year</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="text-center">
                    <p>Would you like to update the active state of this year?</p>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto"><Button variant="danger" onClick={() => inactiveYear(year_id)}>Set Inactive</Button></Col>
                    <Col xs="auto"><Button variant="success" onClick={() => activeYear(year_id)}>Set Active</Button></Col>
                </Row>
            </Modal.Body>
        </Modal>
        </>
        
    );
}