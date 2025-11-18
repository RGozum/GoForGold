import {Button, Modal, Row, Col, Form} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function UpdatePermissionsPop({user_id, fetchUsers}) {
    const [show, setShow] = useState(false);
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole]=useState("");
    const [user, setUser] = useState(null);
 
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true); 
    };

    const fetchRoles = async() => {
        const response = await axios.get('http://localhost:3001/userroles');
        setRoles(response.data);
        console.log(response.data);
    };

    const updatePermissions = async(selectedRole) => {
        const response = await axios.put(`http://localhost:3001/users/${user_id}/permissions`, {user_role_id: selectedRole}, {withCredentials: true});
        const user = response.data;
        setUser(user);

    };


    useEffect(()=> {
        fetchRoles();
    }, [])

    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            if (!selectedRole) return;
            await updatePermissions(selectedRole);
            setSelectedRole("");
            await fetchUsers(user_id);
            handleClose();
        } catch(err) {
            alert(err.response.data.message);
            handleClose();
        }
   
    }

    return (
        <>
        <Button variant="dark" size="md" onClick={handleShow}>
            Update
        </Button>

        <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static">
            <Modal.Header closeButton>
                Update Permissions
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Select value={selectedRole} onChange={(e)=> setSelectedRole(Number(e.target.value))}>
                        <option value="">Select a Role</option>
                        {roles.map((rol)=> (
                            <option key ={rol.user_role_id} value={rol.user_role_id}>
                                {rol.user_role}
                            </option>
                        ))}
                    </Form.Select>
                    <Button variant="success" type="submit" className="mt-3 w-100">
                        Confirm 
                    </Button>

                </Form>
            </Modal.Body>
        </Modal>
        </>
        
    );
}