import React, {useState, useEffect} from "react";
import {Container, Row, Col, Button, Form} from "react-bootstrap";
import axios from "axios";

export default function SignUp() {
    const [user, setUsers] = useState([
        {first_name: "", last_name: "",
             email_address: "", user_role_id: "",
            password:""}
    ]);
    const [roles, setRoles]=useState([]);

    const fetchRoles = async() => {
        const response = await axios.get("http://localhost:3001/userroles");
        setRoles(response.data);
    };
    
    useEffect(() => {
        fetchRoles();
    }, []);

    const handleChange=(index, field, value) => {
        const updated=[...user];
        updated[index][field]=value;
        setUsers(updated);
    }

    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            await axios.post("http://localhost:3001/users", {users: user});
            alert("User created!");
            setUsers([{first_name: "", last_name: "",
                email_address:"", user_role_id: "", password:""}])
        } catch (err) {
            console.error("Error creating users:",err);
            alert("There was an error creating users.")
        }
    }

    return (
        <Container>
            <h3 className="mb-3">Sign Up</h3>
            <Row> 
                <Form>
                <Form.Group>
                <Col md={2}>
                    <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={user.first_name}
                    onChange={(e) => handleChange(index,"first_name",e.target.value)} 
                    className="mb-3"/>
                </Col>
                <Col md={2}>
                    <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={user.last_name}
                    onChange={(e) => handleChange(index,"last_name",e.target.value)} 
                    className="mb-3"/>
                </Col>

                <Col md={4}>
                    <Form.Control
                    type="email" required
                    placeholder="Email Address"
                    value={user.email_address}
                    onChange={(e) => handleChange(index,"email_address",e.target.value)} 
                    className="mb-3"/>
                </Col>
                </Form.Group>
            </Form>
            </Row>
        </Container>
    )
}