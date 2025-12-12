import {Button, Modal, Row, Col, Form} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function ChangePasswordPop({user_id, fetchUsers}) {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);
 
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true); 
    }

    const resetPassword = async() => {
        try {
               const response = await axios.put(`http://localhost:3001/auth/defaultpasswordreset`, {user_id},
                 {withCredentials: true});
                const user = response.data;
                setUser(user);
                handleClose();
                fetchUsers(user_id);
        } catch(err) {
            alert(err.response.data.message || err.message);
            handleClose();
        }
 
}

    return (
        <>
        <Button variant="dark" size="md" onClick={handleShow}>
            Reset to Default Password
        </Button>

        <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static">
            <Modal.Header closeButton>
                Reset Account's Password
            </Modal.Header>
            <Modal.Body>
                <Row className="text-center">
                <p>Would you like to reset the account to its default password?</p>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto"><Button variant="danger" onClick={() => handleClose()}>Deny</Button></Col>
                    <Col xs="auto"><Button variant="success" onClick={() => resetPassword()}>Confirm</Button></Col>
                </Row>
            </Modal.Body>
        </Modal>
        </>
        
    );
}