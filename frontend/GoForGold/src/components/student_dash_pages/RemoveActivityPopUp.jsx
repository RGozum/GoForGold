import {Button, Modal, Form} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function RemoveActivityPop({activities_id, handleDelete, year_id}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleDelete(activities_id);
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
            <Button variant="dark" size="md" onClick={handleShow} disabled={activeYear!=year_id} className="delete-button">&times;</Button> 

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