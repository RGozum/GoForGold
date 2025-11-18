import React, {useState, useEffect, useContext} from 'react';
import {useNavigate, Link} from "react-router-dom";
import {Container, Form, InputGroup, Button, Row, Col} from 'react-bootstrap';
import axios from "axios";
import { AuthContext } from '../AuthContext';

export default function SendOTP() {
    const [email_address, setEmailAddress] = useState("")

    const {user, setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(( ) => {
        if (user) {
            const role = user.user_role
            if (role === "Administrator") navigate("/adminpanel");
            else if (role === "Faculty") navigate("/facultydashboard");
            else navigate("/studentdashboard");
        }
    }, [user,navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {email_address}

    };

    return (
        <Container className="d-flex justify-content-center align-items-center"
        style={{minHeight:'100vh'}}>
            <Container className="p-5 border">

            <h3>Reset your password</h3>

            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Input the email associated with your account</Form.Label>
                <Form.Control 
                type="email"
                placeholder="Enter email" 
                value={email_address}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="ms-auto"/>
            </Form.Group>
            
            <Button type="submit" variant="dark">
                Send
            </Button>
            </Form>

            </Container>
            
        </Container>
    )
}