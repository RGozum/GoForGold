import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import {Spinner, Container, Row} from 'react-bootstrap';
import { AuthContext } from "../AuthContext";
import Pufferfish from '../assets/pufferfish.svg';



export default function ProtectedRoute({allowedRoles, children}) {
    const {user, loading} = useContext(AuthContext);

    if (loading) return (
        <div>
                <Container className="d-flex justify-content-center align-items-center"
                    style={{minHeight:'100vh'}}>
            
            <Container className="p-5 border text-center">

            <h3 className="mb-4">Loading...</h3>
            <hr className="mb-5"></hr>
            <p>If you're seeing this, pufferfish!</p>
            <Spinner animation="border" variant="info" role="status" className="mb-4">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <br /><img src={Pufferfish} style={{height: '100px'}} className="mb-4" />
            <p>Thanks for being patient!</p>
            <br></br>
            </Container>
            
        </Container>
        </div>
    );

    if (!user) return <Navigate to="/login" />;

    if (allowedRoles && !allowedRoles.includes(user.user_role)) return <Navigate to="/unauthorized" />;

    return children;
}