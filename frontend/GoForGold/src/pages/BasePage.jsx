import {Container, Button} from 'react-bootstrap';
import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";


export default function LandingPage() {
    const navigate = useNavigate();    
    

    return (
        <Container className="d-flex justify-content-center align-items-center"
        style={{minHeight:'100vh'}}>
            
            <Container className="p-5 border text-center">

            <h3 className="mb-4">GoForGold</h3>
            <hr className="mb-5"></hr>
            <p>Welcome to SJVHS' Gold and White Award Tracker!</p>
            <br></br>
            <p>Feel free to log in!</p>
            <Button size="lg" variant="dark" onClick={(e)=>navigate("/login")}>Login page</Button>
            </Container>
            
        </Container>
    )
}
