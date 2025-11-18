import {Container, Row, Col} from 'react-bootstrap';
import AdminHeader from "../components/admin_pages/AdminHeader.jsx";
import SearchBase from "../components/search_pages/SearchBase.jsx";


export default function AccountCreationPage() {
    
    return (
        <div>
            <Row className="mb-4">
                <AdminHeader />
            </Row>
            <Row className="mb-4">
                <SearchBase />
            </Row>        
        </div>
    );

}

