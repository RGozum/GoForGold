import React, {useContext} from 'react';
import {Navbar, Nav, Container, NavDropdown, Button, Image} from 'react-bootstrap';
import ProfilePictureIcon from '../../assets/profilepictureicon.svg';
import LogOutIcon from '../../assets/logoutpic.svg';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminHeader.css'


export default function StudentHeader () {
    const {logout, user} = useContext(AuthContext);
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
                    <Nav className="ms-auto">
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