import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MenuNavbar = () => {
    return (
        <Navbar className="my-navbar" bg="dark" variant="dark" expand="lg" fixed="top">
            <Container fluid> {/* Using Fluid to allow more flexibility in alignment - I want the logo more to the left */}
                <Navbar.Brand className="navbar-logo">Festival Finder</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto custom-nav-links">
                        <Nav.Link as={Link} to="/profile">My Profile</Nav.Link>
                        <Nav.Link as={Link} to="/chats">My Chats</Nav.Link>
                        <Nav.Link as={Link} to="/logout">Log Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MenuNavbar;