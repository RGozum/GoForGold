import {Container, Row, Col} from 'react-bootstrap';
import FacultyHeader from "../components/faculty_dash_pages/FacultyHeader.jsx";
import AttendancePanel from "../components/attendance_pages/AttendancePanel.jsx";

export default function AccountCreationPage() {
    
    return (
        <div>
            <Row className="mb-4">
                <FacultyHeader />
            </Row>
            <Row className="mb-4">
                <AttendancePanel />
            </Row>        
        </div>
    );

}

