import {Button, Modal, Row, Col, Form} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function EditEmailAddressPop({user_id, fetchUsers}) {
    const [show, setShow] = useState(false);
    const [emailAddress, setEmailAddress]=useState("")
    const [user, setUser] = useState(null);
 
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true); 
    }

    const updateEmail = async() => {

        try {
            const response = await axios.put(`http://localhost:3001/users/changeemail/${user_id}`, {
                newEmailAddress: emailAddress
            }, {withCredentials: true});

            const user = response.data;
            setUser(user);
        } catch (err) {
            alert("There was an error updating the email: " + err.response.data.message);
        };
 
};

const handleSubmit = async(e)=> {
    e.preventDefault();

    if (!emailAddress) {
        alert("Please input an email.");
        return;
    }

    await updateEmail();
    fetchUsers(user_id);
    setEmailAddress("");
    handleClose();

}


    return (
        <>
        <Button variant="dark" size="md" onClick={handleShow}>
            Edit Email
        </Button>

        <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static">
            <Modal.Header closeButton>
                Edit Email
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Input the new email</Form.Label>
                    <Form.Control 
                        type="email"
                        placeholder="Enter new email" 
                        value={emailAddress}
                        onChange={(e)=> setEmailAddress(e.target.value)}
                        className="ms-auto"/> 
                    <Button variant="dark" type="submit" className="mt-3">Change Email</Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
        
    );
}