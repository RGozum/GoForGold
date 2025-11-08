import {Container, Row, Col} from 'react-bootstrap';
import FacultyHeader from "../components/faculty_dash_pages/FacultyHeader.jsx";
import ActivitiesDash from "../components/student_dash_pages/ActivitiesDash.jsx";


export default function AccountCreationPage() {
    
    return (
        <div>
            <Row className="mb-4">
                <FacultyHeader />
            </Row>
            <Row className="mb-4">
                <ActivitiesDash />
            </Row>        
        </div>
    );

}

