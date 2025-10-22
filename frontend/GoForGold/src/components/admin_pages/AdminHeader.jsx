import React from 'react';
import {Navbar, Nav, Container, NavDropdown, Button, Image} from 'react-bootstrap';
import SearchIcon from '../../assets/search.png';
import ProfilePictureIcon from '../../assets/profilepicture.png';
import LogOutIcon from '../../assets/logout.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminHeader.css'


export default function AdminHeader ({onLogout}) {
    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">Go For Gold!</Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="ms-auto d-flex align-items-center " navbarScroll>
                        <Nav.Link href="/adminpanel">Admin Panel</Nav.Link>
                        <Nav.Link href="/honorroll">Honor Roll</Nav.Link>
                        <Nav.Link href="/accountcreation">Account Creation</Nav.Link>
                    </Nav>

                    <Nav className="d-flex align-items-center gap-3">
                        <Nav.Link href="search" className="nav-link">
                            <img src={SearchIcon} className="search-icon" />
                        </Nav.Link>

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