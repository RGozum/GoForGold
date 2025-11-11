import React, {useContext} from 'react';
import {Navbar, Nav, Container, NavDropdown, Button, Image} from 'react-bootstrap';
import ProfilePictureIcon from '../../assets/profilepictureicon.svg';
import LogOutIcon from '../../assets/logoutpic.svg';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';


export default function AdminHeader () {
    const {user, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = async (e) => {
        e.preventDefault();
        await logout();
        navigate("/login");
    }
    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">Go For Gold!</Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="ms-auto d-flex align-items-center " navbarScroll>
                        <Nav.Link href="/facultydashboard">Faculty Dashboard</Nav.Link>
                        <Nav.Link href="/attendance">Attendance Panel</Nav.Link>
                        {user.user_role === "Administrator" ? <Nav.Link href="/adminpanel">Admin Panel</Nav.Link> : <div></div>}
                    </Nav>

                    <Nav className="d-flex align-items-center gap-3">
                        <NavDropdown title={
                            <img src={ProfilePictureIcon} className="pfp"/>
                        } id="profile-dropdown" align="end">

                            <NavDropdown.Item onClick={onLogout} className="logout-drop">
                                <img src={LogOutIcon} className="logout"/><div className="gap"/>
                                Logout
                                </NavDropdown.Item>
                        </NavDropdown>


                    </Nav>

                </Navbar.Collapse>
            </Container>

        </Navbar>
    )
}