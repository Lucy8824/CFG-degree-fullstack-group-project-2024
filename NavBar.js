import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  return (
    <Navbar className="bg-body-tertiary justify-content-between">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Row>
            <Col xs="auto">
              <Navbar.Brand href="#home">Logo</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="#home">My profile</Nav.Link>
                <Nav.Link href="#features">Feeds</Nav.Link>
                <Nav.Link href="#pricing">Upcoming festivals</Nav.Link>
                <Nav.Link href="#pricing">Messages</Nav.Link>
              </Nav>
            </Col>
            <Col xs="auto">
              <Button type="submit">Log out</Button>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </Navbar>
  );
}

export default NavBar;
