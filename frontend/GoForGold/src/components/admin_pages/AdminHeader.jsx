import React, {useContext} from 'react';
import {Navbar, Nav, Container, NavDropdown, Button, Image} from 'react-bootstrap';
import SearchIcon from '../../assets/searchicon.svg';
import ProfilePictureIcon from '../../assets/profilepictureicon.svg';
import LogOutIcon from '../../assets/logoutpic.svg';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminHeader.css'


export default function AdminHeader () {
    const {user,logout} = useContext(AuthContext);
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
                        <Nav.Link href="/adminpanel">Admin Panel</Nav.Link>
                        <Nav.Link href="/facultydashboard">Faculty Dashboard</Nav.Link>
                        <Nav.Link href="/honorroll">Honor Roll</Nav.Link>
                        <Nav.Link href="/accountcreation">Account Creation</Nav.Link>
                    </Nav>

                    <Nav className="d-flex align-items-center gap-3">
                        <Nav.Link href="search" className="nav-link">
                            <img src={SearchIcon} className="search-icon" />
                        </Nav.Link>

                        <NavDropdown title={
                            <div>
                                <img src={ProfilePictureIcon} className="pfp"/>
                                <span className="ms-2">{user?.first_name} {user?.last_name}</span>
                            </div>
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