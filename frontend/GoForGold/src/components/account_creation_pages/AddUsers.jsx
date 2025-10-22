import React, {useState, useEffect} from "react";
import {Container, Row, Col, Button, Form} from "react-bootstrap";
import axios from "axios";
import './AddUsers.css';

export default function AddUsersComponent() {
    const [userRows, setUserRows] = useState([
        {first_name: "", last_name: "",
             email_address: "", user_role_id: ""}
    ]);
    const [roles, setRoles]=useState([]);

 

    const fetchRoles = async() => {
        const response = await axios.get("http://localhost:3001/userroles");
        setRoles(response.data)
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleChange=(index, field, value) => {
        const updated=[...userRows];
        updated[index][field]=value;
        setUserRows(updated);
    };

    const handleAddRow = () => {
        setUserRows([
            ...userRows, 
            {first_name: "", last_name: "",
             email_address: "", user_role_id: ""},
            ]);
    };

    const handleRemoveRow = (index) => {
        const updated = userRows.filter((_, i) => i !== index);
        setUserRows(updated);
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await axios.post("http://localhost:3001/users/bulk", {users: userRows});
            alert("Users created successfully!");
            setUserRows([{first_name: "", last_name: "", email_address: "", user_role_id:""}])
        } catch (err) {
            console.error("Error creating users:", err);
            alert("There was an error creating users.");
        }
    };

    return (
            <Container fluid="md" className="panel">    
                <Col className="d-flex align-items-center">
                <h3>Create Accounts</h3>
                <Button className="ms-auto mb-2" disabled>Import list</Button>
                </Col>
                
                <Form>
                    {userRows.map((user,index)=> (
                        <Row key={index} className="align-items-center mb-3">
                            <Col md={2}>
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    value={user.first_name}
                                    onChange={(e)=> handleChange(index, "first_name",e.target.value)} />
                            </Col>
                            <Col md={2}>
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    value={user.last_name}
                                    onChange={(e) =>
                                        handleChange(index, "last_name", e.target.value)
                                    } />
                            </Col>
                            <Col md={2}>
                                <Form.Control
                                    type="text"
                                    placeholder="Email"
                                    value={user.email_address}
                                    onChange={(e) =>
                                        handleChange(index, "email_address", e.target.value)
                                    } />
                            </Col>
                            <Col md={3}>
                                <Form.Select value={user.user_role_id} onChange={(e)=> handleChange(index,"user_role_id", Number(e.target.value))}>
                                    <option value="">Select a role</option>
                                    {roles.map((rol) => (
                                        <option key={rol.user_role_id} value={rol.user_role_id}>
                                            {rol.user_role}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col md={2} className="text-end">
                            <Button
                                variant="danger"
                                onClick={() =>handleRemoveRow(index)} 
                                disabled={userRows.length===1}>
                                Remove
                                </Button>
                                </Col>
                        </Row>
                    ))}

                    <Row className="mt-3">
                        <Col>
                            <Button variant="secondary" onClick={handleAddRow}>
                                + Add Another User
                            </Button>{" "}
                            <Button variant="primary" onClick={handleSubmit}>
                                Submit All
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>

    );
}