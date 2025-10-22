import {Container, Row, Col} from 'react-bootstrap';
import AddUsers from '../components/account_creation_pages/AddUsers';
import AdminHeader from "../components/admin_pages/AdminHeader.jsx";

export default function AccountCreationPage() {
    
    return (
        <div>
            <Row className="mb-4">
                <AdminHeader />
            </Row>
            <Row>
                <AddUsers />
            </Row>
    
        </div>
    );

}

