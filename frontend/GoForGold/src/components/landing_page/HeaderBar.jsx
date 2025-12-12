import Container from 'react-bootstrap/Container';
import {Navbar, Nav} from 'react-bootstrap';

function Header() {
  return (
    <>
      <Navbar className="header-overlay" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/"><h3>Go For Gold</h3></Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
         
        <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto" navbarScroll>
                
                <Nav.Link href="#info">
                  <h5>Info</h5>
                </Nav.Link>
                <Nav.Link href="#requirements">
                  <h5>Requirements</h5>
                </Nav.Link>

                <Nav.Link href="/login" className="ms-3">
                <h5>Log Into Account</h5></Nav.Link>
            </Nav>
            </Navbar.Collapse>
            </Container>
      </Navbar>
    </>
  );
}

export default Header;