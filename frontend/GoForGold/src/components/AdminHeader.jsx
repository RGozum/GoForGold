import React from 'react';
import {Navbar, Nav, Container, NavDropdown, Button, Image} from 'react-bootstrap';
import SearchIcon from '../assets/search.png';
import ProfilePictureIcon from '../assets/profilepicture.png';
import LogOutIcon from '../assets/logout.png';

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










// 
// 

// 

// import React, {useState} from 'react';

// function DropdownItem(props) {
//     return (
//         <li className='dropdownItem'>
//             <img src={props.img}></img>
//             <a> {props.text}</a>
//         </li>
//     );
// }

// export default function AdminHeader() {
    
//     const [open, setOpen] = useState(false);

//     return <nav className="nav">
//         <a href ="/" className="site-title">Go For Gold!</a>
//         <ul>
//             <li>
//              <a href ="/adminpanel">Admin Panel </a>
//              </li>
//              <li><a href="/honorroll">Honor Roll </a></li>
//              <li><a href="/accountcreation">Account Creation</a></li>
//              <li><a href="/search"><img src= {SearchIcon} className="searchIcon" width="30" /></a></li>
             
//              <li><div className = 'menu-container'>
//                 <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
//                     <img src={ProfilePictureIcon} className='pfp' width="30"></img>
//                 </div>
//              </div>
//              </li>
//             <li>
//              <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
//                 <ul>
//                     <a href="/landingpage"><DropdownItem img = {LogOutIcon} text={"Log Out"}/></a>
//                 </ul>
//             </div>

//             </li>
//         </ul>
//         </nav>

// }



