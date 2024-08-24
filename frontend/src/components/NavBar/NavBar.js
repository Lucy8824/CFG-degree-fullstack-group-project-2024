import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './NavBar.css';
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';



const NavBar = ({userId}) => {

    console.log("Nav:", userId);
    return (
        <Navbar className="navbar-custom" expand="lg" fixed="top">
            <Container fluid> {/* Using Fluid to allow more flexibility in alignment - I want the logo more to the left */}
                <Navbar.Brand className="brandLogo" href="#My profile">
                    <img src={logo} alt="Festival Meetup Logo" clasName="logoImage" width="40px" />Festival Meetup 
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between" >
                    <Nav className="mr-auto custom-nav-links">
                        <Nav.Link className="navBarList" as={Link} to={`/Profile/${userId}`}>My Profile</Nav.Link>
                        <Nav.Link className="navBarList"as={Link} to={`/Messages/${userId}`}>My Chats</Nav.Link>
                        <Nav.Link className="navBarList"as={Link} to={`/feeds/${userId}`}>Feeds</Nav.Link>
                        <Nav.Link className="navBarList"as={Link} to="/festivals">Festivals</Nav.Link>
                    </Nav>
                    <Button className="logOutButton">Log Out</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;