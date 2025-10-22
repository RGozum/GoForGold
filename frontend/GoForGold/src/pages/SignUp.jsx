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
            alert("There was an error cre")
        }
    }

    return (
        <Container>
            <h3>Sign Up</h3>
            <Form>
                <Col md={2}>
                    <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={user.first_name}
                    onChange={(e) => handleChange 
                </Col>
            </Form>
        </Container>
    )
}