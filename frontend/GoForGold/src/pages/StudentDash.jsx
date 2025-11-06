import {Container, Row, Col} from 'react-bootstrap';
import AdminHeader from "../components/student_dash_pages/StudentHeader.jsx";
import ActivitiesDash from "../components/student_dash_pages/ActivitiesDash.jsx";


export default function AccountCreationPage() {
    
    return (
        <div>
            <Row className="mb-4">
                <AdminHeader />
            </Row>
            <Row className="mb-4">
                <ActivitiesDash />
            </Row>        
        </div>
    );

}

