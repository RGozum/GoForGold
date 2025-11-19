import React, {useState, useEffect, useContext} from 'react';
import {useNavigate, Link} from "react-router-dom";
import {Container, Form, InputGroup, Button, Row, Col} from 'react-bootstrap';
import axios from "axios";
import { AuthContext } from '../AuthContext';

export default function SendOTP() {
    const [email_address, setEmailAddress] = useState("")
    const {user, setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const [timer,setTimer]=useState(0);
    const [message, setMessage]=useState("");
    const [error,setError]=useState("");

    useEffect(() => {
        if (user) {
            const role = user.user_role
            if (role === "Administrator") navigate("/adminpanel");
            else if (role === "Faculty") navigate("/facultydashboard");
            else navigate("/studentdashboard");
        }
    }, [user,navigate]);

    useEffect(()=> {
        if (timer <=0) return;

        const interval = setInterval(()=> {
            setTimer(timer-1);
        },1000);

        return () => clearInterval(interval);
    }, [timer])


    const sendReset = async (e) => {
        e.preventDefault();
        setError("")
        setMessage("")
        try {
            const response=await axios.post("http://localhost:3001/auth/generatetoken", {email_address});
            setMessage("Code sent to email.");
            setTimer(60);
        } catch(err) {
            if (err.response?.status===429) {
            const secondsLeft=err.response.data.seconds_left;
            setTimer(secondsLeft);
            setError(`Please wait ${secondsLeft} seconds before trying again`);
        } else {
            console.error("Login error:", err);
            alert("Network or server error");
        }
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center"
        style={{minHeight:'100vh'}}>
            <Container className="p-5 border">

            <h3>Reset your password</h3>

            <Form onSubmit={sendReset}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Input the email associated with your account</Form.Label>
                <Form.Control 
                type="email"
                placeholder="Enter email" 
                value={email_address}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="ms-auto"/>
            </Form.Group>
            </Form>
            <Button onClick={sendReset}
            disabled={timer >0}
            variant="dark">
                {timer > 0 ?`Resend in ${timer}s`: "Send Code"}
            </Button> <Button variant="dark" onClick={(e)=> navigate("/resetpassword",{state: {email_address}})}>Verify your Code</Button>

            {message && <p className="text-success mt-3">{message}</p>}
            {error && <p className="text-danger mt-3">{error}</p>}  
 
            </Container>
            <span>
            </span>
            
        </Container>
    )
}