import LogOutIcon from '../assets/logout.png';
import ProfilePictureIcon from '../assets/profilepicture.png';
import SearchIcon from '../assets/search.png';

import './AdminHeader.css'

import React, {useState} from 'react';

function DropdownItem(props) {
    return (
        <li className='dropdownItem'>
            <img src={props.img}></img>
            <a> {props.text}</a>
        </li>
    );
}

export default function AdminHeader() {
    
    const [open, setOpen] = useState(false);

    return <nav className="nav">
        <a href ="/" className="site-title">Go For Gold!</a>
        <ul>
            <li>
             <a href ="/adminpanel">Admin Panel </a>
             </li>
             <li><a href="/honorroll">Honor Roll </a></li>
             <li><a href="/accountcreation">Account Creation</a></li>
             <li><a href="/search"><img src= {SearchIcon} className="searchIcon" width="30" /></a></li>
             
             <li><div className = 'menu-container'>
                <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                    <img src={ProfilePictureIcon} className='pfp' width="30"></img>
                </div>
             </div>
             </li>
            <li>
             <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                <ul>
                    <a href="/landingpage"><DropdownItem img = {LogOutIcon} text={"Log Out"}/></a>
                </ul>
            </div>

            </li>
        </ul>
        </nav>

}



