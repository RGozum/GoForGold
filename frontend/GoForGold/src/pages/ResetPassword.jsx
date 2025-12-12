import React, {useState, useEffect, useContext} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import {Container, Form, InputGroup, Button, Row, Col} from 'react-bootstrap';
import axios from "axios";
import { AuthContext } from '../AuthContext';

export default function ResetPassword() {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const location=useLocation();

    const {email_address}=location.state;

    const [code, setCode]=useState("");
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

    useEffect(() => {
        if (user) {
            const role = user.user_role
            if (role === "Administrator") navigate("/adminpanel");
            else if (role === "Faculty") navigate("/facultydashboard");
            else navigate("/studentdashboard");
        }
    }, [user,navigate]);

    useEffect(()=> {
        if (password !== confirmPassword) {
            setMessage("The passwords are not the same.")
        } else {
            setMessage("");
        }
    }, [password, confirmPassword]);

    const resetPassword = async (e) => {
        e.preventDefault();
        if (!code) return alert("Please include your code.");
        if (!password) return alert("Please include your password");
        if (password !== confirmPassword) return alert("Your passwords do not match.");

        const data = {email_address, token: code, newpassword: password};

        try {
            await axios.post('http://localhost:3001/auth/resetpassword', data);

            alert("Password successfully reset! Redirecting you...");
            setTimeout(()=>navigate("/login"), 2000);

        } catch (err) {
            if (err.response) {
            alert(err.response.data.error)
        } else {
            console.error("Login error:", err);
            alert("Network or server error");
        }
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center"
        style={{minHeight:'100vh'}}>
            <Container className="p-5 border">

            <h3>Reset your password</h3>

            <Form onSubmit={resetPassword}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter the code</Form.Label>
                <Row className="mb-3">
                    <Col xs={4}>
                        <Form.Control 
                        type="text"
                        placeholder="Enter code" 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="ms-auto"/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Enter a password</Form.Label>
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
                
            </Form.Group>
            </Form>
            
            </Container>
            
        </Container>
    )
}