import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function BrandExample() {
  return (
    <>
      <Navbar sticky="top">
        <Container>
          <Navbar.Brand href="/">Go For Gold</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default BrandExample;