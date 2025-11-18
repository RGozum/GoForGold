import {Row} from 'react-bootstrap';
import ProfilePage from "../components/search_pages/ProfilePage.jsx";
import AdminHeader from "../components/admin_pages/AdminHeader.jsx";

export default function Profile() {
    return (
        <div>
            <Row className="mb-4">
                <AdminHeader />
            </Row>
            <Row className="mb-4">
                <ProfilePage />
            </Row>
        </div>
    )
}