import {Container, Form, Row, Col, Button, Table} from 'react-bootstrap';
import {Link} from 'react-router';
import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './SearchBase.css';

export default function SearchBase() {
    const [firstNameQuery, setFirstNameQuery]=useState("");
    const [lastNameQuery, setLastNameQuery]=useState("");
    const [results, setResults]=useState([]);

    const searchUsers=async (e) => {
        e.preventDefault()
        try {
            const params = new URLSearchParams({first_name: firstNameQuery, last_name: lastNameQuery});
            const response = await axios.get(`http://localhost:3001/users/search?${params.toString()}`, {withCredentials: true});
            setResults(response.data);
        } catch (error) {
            console.error("Error finding users:", error);
            setResults([]);
        }
    };



    return (
        <div>
            <h3 className="mb-3">Search</h3>
            <div className="search">
                <Form onSubmit={searchUsers}>
                    <Row className="mb-3">
                        <Col xs={2}>
                            <Form.Label className="me-2 mb-0">
                                Last Name:
                            </Form.Label>
                        </Col>
                        <Col xs={3}>
                            <Form.Control 
                                type="text" 
                                value={lastNameQuery}
                                onChange={(e) =>setLastNameQuery(e.target.value)}/>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={2}>
                            <Form.Label className="me-2 mb-0">
                                First Name:
                            </Form.Label>
                        </Col>
                        <Col xs={3}>
                            <Form.Control 
                                type="text" 
                                value={firstNameQuery}
                                onChange={(e) =>setFirstNameQuery(e.target.value)}/>
                        </Col>
                    </Row>
                    <Button variant="dark" type="submit">
                        Search
                    </Button>
                </Form>
            </div>
            <div className="results mt-4">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User's ID</th>
                            <th>Last Name</th>
                            <th>First Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.length >0 ? (
                            results.map((user, index)=> (
                                <tr key={user.user_id || index}>
                                    <td>{index+1}</td>
                                    <td>{user.user_id}</td>
                                    <td>
                                        <Link to={`/profile/${user.user_id}`}>
                                        {user.last_name}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/profile/${user.user_id}`}>
                                        {user.first_name}
                                        </Link>
                                        </td>
                                </tr> 
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}