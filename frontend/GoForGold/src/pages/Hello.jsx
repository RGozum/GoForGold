import './Hello.css';
import AdminHeader from "../components/AdminHeader.jsx";
import AdminScrollablePanel from "../components/CategoryScrollablePanel.jsx";
import ActivityPanel from "../components/ActivityPanel.jsx";
import {Container, Row, Col} from 'react-bootstrap';


export default function Hello() {
    return (

      <div>
        <AdminHeader />
      </div>
      // <div>
      // <AdminHeader />
      // <div>
      //   <AdminScrollablePanel />
      //    <ActivityPanel />
      // </div>
      
      // <Container>
      // <Row>
      //   <Col><AdminScrollablePanel />
      //   </Col>
      //   <Col><ActivityPanel />
      //   </Col>
      // </Row>

      // </Container>


      // </div>

    );
}