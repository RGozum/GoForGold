import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {NavDropdown, Button, Modal, Form, InputGroup, Row, Col} from 'react-bootstrap';

export default function ResetPasswordPop () {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setCurrentPassword("");
        setPassword("");
        setConfirmPassword("");

        setShow(true); 
    }

    const [currentPassword, setCurrentPassword]=useState("");
    const [showCurrentPassword, setShowCurrentPassword]=useState(false);

    const verifyPassword = async() => {
        try {
            const response = await axios.post("http://localhost:3001/auth/verifypassword", 
                {currentPassword: currentPassword}, {withCredentials: true}
            );

            return true;
        } catch(err) {
            if (err.response?.status===401) {setMessage("Current password is incorrect")
            } else {
            setMessage("Error verifiying password");
            }
            return false;
        }
    }

    const updatePassword = async() => {
        try {
            await axios.post("http://localhost:3001/auth/changepassword", {
                newPassword: password
            }, {withCredentials: true});
        } catch (err) {
            console.error("Error updating password: " + err); 
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            setMessage("Please input a password");
            return;
        }

        if (!currentPassword) {
            setMessage("Please input your current password");
            return;
        }

        const fine = await verifyPassword();
        if (!fine) return;

        if (password !== confirmPassword) {
            setMessage("Your passwords do not match."); 
            return;
        }

        await updatePassword();
        handleClose();
    };

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    
    const [showPassword, setShowPassword]=useState(false);
    const [showConfirmPassword, setShowConfirmPassword]=useState(false);
    const [message, setMessage]=useState("");
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPasswordVisiblity = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    }

    useEffect(()=> {
        if (password !== confirmPassword) {
            setMessage("The passwords are not the same.")
        } else {
            setMessage("");
        }
    }, [password, confirmPassword]);

return (
    <>
        <NavDropdown.Item onClick={handleShow} className="logout-drop">
            Reset Password
        </NavDropdown.Item >


                <Modal 
                    show={show} 
                    onHide={handleClose}
                    backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Reset Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>

                        <Row className="mb-3"> 
                            <Col>
                            <Form.Label>Current Password</Form.Label> 
                            <InputGroup>
                                <Form.Control type={showCurrentPassword ? "text" : "password"} 
                                placeholder="Enter current password" 
                                value={currentPassword}
                                onChange={(e)=> setCurrentPassword(e.target.value)} />
                                <Button variant="outline-secondary" onClick={toggleCurrentPasswordVisibility}>
                                {showCurrentPassword ? "Hide" : "Show" }
                            </Button>
                            </InputGroup>
                            </Col>
                        </Row>
                        
                    <Row className="mb-3">
                        <Col>
                        <Form.Label>Enter new password</Form.Label>
                            <InputGroup>

                            <Form.Control 
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password" 
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            className="ms-auto"/> 
                            <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                                {showPassword ? "Hide" : "Show" }
                            </Button>
                        
                            </InputGroup>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                         <Form.Label>Confirm password</Form.Label>
                            <InputGroup>
                            <Form.Control 
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password" 
                            value={confirmPassword}
                            onChange={(e)=> setConfirmPassword(e.target.value)}
                            className="ms-auto"/> 
                        <Button variant="outline-secondary" onClick={toggleConfirmPasswordVisiblity}>
                            {showConfirmPassword ? "Hide" : "Show" }
                        </Button>
                    </InputGroup>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                    {message && <p className="text-danger mt-3">{message}</p>}</Col>
                </Row>
                <Button variant="dark" type="submit">Reset Password</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
     </>

)
}