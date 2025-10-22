import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

import './ScrollablePanel.css';


export default function UsersComponent() {
const [users, setUsers] = useState([]);
const [roles, setRoles] = useState([]);
const [selectedRole, setSelectedRole] = useState("");

const fetchUsers = async(role_id) => {
    if (!role_id) return;
    const response = await axios.get("http://localhost:3001/users", {
        params: {user_role_id: role_id},
    });
    setUsers(response.data);
}

const fetchRoles = async() => {
    const response = await axios.get("http://localhost:3001/userroles");
    setRoles(response.data);
};

const archiveUser = async(user_id) => {
    const response = await axios.put(`http://localhost:3001/users/${user_id}/archive`);
    const updatedUser = response.data;

    setUsers((prevUsers) =>
    prevUsers.map((use) =>
    use.user_id === updatedUser.user_id ? updatedUser : use));
}

useEffect(() => {
    fetchRoles();
}, []);

useEffect(() => {
    if (roles.length>0 && selectedRole==="") {
        setSelectedRole(roles[0].user_role_id);
    }
}, [roles]);

useEffect(() => {
    if (!selectedRole) return;
    fetchUsers(selectedRole);
}, [selectedRole]);


    return (
        <div>
            <div className = "scrollable-panel-users">
                <h3 className="title">Users</h3>
                <Button variant="dark" size="md" href="/accountcreation" className="add-button">
                    + Add Account
                </Button>


                <Form.Select value={selectedRole} onChange={(e)=> setSelectedRole(Number(e.target.value))} className="mb-2">
                    <option value="">Select a role</option>
                    {roles.map((role) => (
                        <option key={role.user_role_id} value={role.user_role_id}>
                            {role.user_role}
                        </option>

                    ))}
                </Form.Select>

                {users.length===0 ? (<p>No users found.</p>) : (
                    <ul className="ul-style">
                        {users.map((us) => (
                            <li key = {us.user_id} className="scroll-item">
                                <span className= {`${us.active ? "active" : "inactive"}`}>
                                    {us.first_name} {us.last_name}
                                </span>
                                    <Button variant="dark" size="sm" onClick={() => archiveUser(us.user_id)} className="button">
                                         &times;
                                    </Button>  
                            </li>
                        ))}
                    </ul>
                )}

            </div>
        </div>


    );

}