import {Container, Row, Col} from 'react-bootstrap';
import React, {useContext} from 'react';

import {useNavigate} from "react-router-dom";
import { AuthContext } from '../AuthContext';



export default function Unauthorized() {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();    

    setTimeout(()=>
        {const role = user.user_role
            if (role === "Administrator") navigate("/adminpanel");
            else if (role === "Faculty") navigate("/facultydashboard");
            else navigate("/studentdashboard");
        }, 2000);
    
    return (
        <Container className="d-flex justify-content-center align-items-center"
        style={{minHeight:'100vh'}}>
            
            <Container className="p-5 border text-center">

            <h3 className="mb-4">Unauthorized</h3>
            <hr className="mb-5"></hr>
            <p>You do not have the permissions to access this.</p>
            <p>Redirecting you to the correct dashboard...</p>
            </Container>
            
        </Container>
    );

}

