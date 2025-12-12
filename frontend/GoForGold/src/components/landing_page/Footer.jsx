import {Container, Col} from 'react-bootstrap';
import './LandingPage.css';

export default function Footer() {
  return (
    <>
      <div className="footer">
        <Col>
         <p>
            This website was created by Roseyn Gozum (2026).
        </p>
        <p>
            Thank you to Professor Squires and Mr. McKenna for their help on this project.
        </p>
        </Col>
       <Col className="footer-column">
            <h4>Attributions</h4>
            <p className="footer-column-attributions">
                <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a>
                <br />
                <a href="https://www.flaticon.com/free-icons/back" title="back icons">Back icons created by Freepik - Flaticon</a>
                <br />
                <a href="https://www.flaticon.com/free-icons/log-out" title="log out icons">Log out icons created by Anggara - Flaticon</a>
                <br />
                <a href="https://www.flaticon.com/free-icons/fish" title="fish icons">Fish icons created by Khoirul Huda - Flaticon</a>
                </p>
       </Col>

      </div>
    </>
  );
}