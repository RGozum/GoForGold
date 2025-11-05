import React from 'react';
import {Navbar, Nav, Container, NavDropdown, Button, Image} from 'react-bootstrap';
import ProfilePictureIcon from '../../assets/profilepictureicon.svg';
import LogOutIcon from '../../assets/logoutpic.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminHeader.css'


export default function AdminHeader ({onLogout}) {
    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">Go For Gold!</Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="ms-auto">
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