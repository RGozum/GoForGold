import {Link, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import {Button, Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackArrow from '../../assets/backarrow.svg';

import './SearchBase.css';
import ArchivePop from './ArchivePop.jsx';
import UpdatePermissionsPop from './UpdatePermissionsPop.jsx';

export default function ProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const {user_id} = useParams();

    const fetchUsers = async(user_id) => {
    const response = await axios.get(`http://localhost:3001/users/${user_id}`, 
        {withCredentials: true}
    );
    setUser(response.data);
    console.log(response.data);
    }

    useEffect(() => {
        fetchUsers(user_id);
    }, [user_id])
    
    const backPage = (e) => {
        e.preventDefault();
        navigate(-1);
    }

    if (!user) return <p>Loading...</p>

    return(
        <div>
            <Link to="/search" className="mb-3 d-flex align-items-center text-decoration-none" style={{fontSize:"1.25rem", color: 'black'}}
            onClick={(e)=> backPage(e)}>
                <img src={BackArrow} className="logout me-3" />
                Return to Previous Page
            </Link>
            <div className="panel">
                <h3 className="mb-3">User {user_id}</h3>
                <p>{user.first_name} {user.last_name}</p>
                <p>Account Role: {user.User_Role.user_role}</p>
                <p>Email Address: {user.email_address}</p>
                <p>Active: {user.active ? "Active" : "Inactive"} </p>
                <span>
                    
                </span>
                <Row className="d-flex">
                    <Col xs={2}>
                        <ArchivePop user_id={user_id} fetchUsers={fetchUsers} />
                    </Col>
                    <Col>
                        <UpdatePermissionsPop user_id={user_id} fetchUsers={fetchUsers}/>
                    </Col>
                </Row>
            </div>
        </div>
    )
} 