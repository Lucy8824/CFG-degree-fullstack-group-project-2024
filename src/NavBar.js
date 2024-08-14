import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './NavBar.css';

export default function NavBar() {
    return (
        <Navbar expand="lg" className="navbar-custom">
            <Container>
                <Navbar.Brand href="#My profile" className="brandLogo">LOGO</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="navBarList" href="#My profile">My profile</Nav.Link>
                        <Nav.Link className="navBarList" href="#Feeds">Feeds</Nav.Link>
                        <Nav.Link className="navBarList" href="#Upcoming festivals">Upcoming festivals</Nav.Link>
                        <Nav.Link className="navBarList" href="#Messages">Messages</Nav.Link>
                    </Nav>
                    <Button className="logOutButton">Log out</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );  
}
