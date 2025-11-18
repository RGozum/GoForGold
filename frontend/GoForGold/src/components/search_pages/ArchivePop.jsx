import {Button, Modal, Row, Col, Form} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function ArchivePop({user_id, fetchUsers}) {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);
 
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true); 
    }

    const archiveUser = async() => {
        try {
               const response = await axios.put(`http://localhost:3001/users/${user_id}/archive`, {},
                 {withCredentials: true});
                const user = response.data;
                setUser(user);
                handleClose();
                fetchUsers(user_id);
        } catch(err) {
            alert(err.response.data.message);
            handleClose();
        }
 
}


    return (
        <>
        <Button variant="dark" size="md" onClick={handleShow}>
            Archive
        </Button>

        <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static">
            <Modal.Header closeButton>
                Archive Account
            </Modal.Header>
            <Modal.Body>
                <Row className="text-center">
                <p>Would you like to update the active state of this account?</p>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto"><Button variant="danger" onClick={() => handleClose()}>Deny</Button></Col>
                    <Col xs="auto"><Button variant="success" onClick={() => archiveUser()}>Confirm</Button></Col>
                </Row>
            </Modal.Body>
        </Modal>
        </>
        
    );
}