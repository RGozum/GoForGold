import {Container, Row, Col} from 'react-bootstrap';
import FacultyHeader from "../components/faculty_dash_pages/FacultyHeader.jsx";
import ModActivitiesDash from "../components/faculty_dash_pages/ModActivitiesdash.jsx";

export default function AccountCreationPage() {
    
    return (
        <div>
            <Row className="mb-4">
                <FacultyHeader />
            </Row>
            <Row className="mb-4">
                <ModActivitiesDash />
            </Row>        
        </div>
    );

}

