import {Container, Row, Col} from 'react-bootstrap';
import AdminHeader from "../components/admin_pages/AdminHeader.jsx";
import HonorDash from "../components/honor_roll_pages/HonorDash.jsx"


export default function AccountCreationPage() {
    
    return (
        <div>
            <Row className="mb-4">
                <AdminHeader />
            </Row>
            <Row className="mb-4">
                <HonorDash />
            </Row>        
        </div>
    );

}

