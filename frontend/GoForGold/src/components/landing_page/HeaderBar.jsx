import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <>
      <Navbar className="header-overlay" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/"><h3>Go For Gold</h3></Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;