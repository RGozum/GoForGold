import React, {useState,useEffect} from 'react';
import {Container, Form, InputGroup, Button} from 'react-bootstrap';
import axios from "axios";

export default function LogIn() {
    const [email_address, setEmailAddress] = useState("")
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword]=useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {email_address: email_address, password:password}
        axios.post("http://localhost:3001/users/login",data).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
          sessionStorage.setItem("accessToken", response.data);
          }
        });

    };
    return (
        <Container className="d-flex justify-content-center align-items-center"
        style={{minHeight:'100vh'}}>
            <Container className="p-5 border">

            <h3>Log Into Account</h3>

            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                type="email"
                placeholder="Enter email" 
                value={email_address}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="ms-auto"/>
            </Form.Group>
            
            <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
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
                </Form.Group>   
                <Button type="submit">
                    Log In
                </Button>
            </Form>

            </Container>
            
        </Container>
    )
}