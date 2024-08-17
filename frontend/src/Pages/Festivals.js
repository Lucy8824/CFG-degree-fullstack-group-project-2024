import React, { useState, useEffect } from "react";
import FestivalCard from "../component/FestivalCard";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import "../App.css";
import MenuNavbar from "../component/Navbar";
import { fetchFestivals } from "../services/ticketmaster";
// Would also need to import Profile, Chats and Logout?

function Festivals() {

    // const festivals = [
        // {
        //     id:1,
        //     poster: "https://via.placeholder.com/150",
        //     name: "Summer Beats Festival",
        //     dates: "June 15 -17, 2024",
        //     location: "Los Angeles, CA"
        // },
        // {
        //     id:2, 
        //     poster: "https://via.placeholder.com/150",
        //     name: "Rock the City",
        //     dates: "July 20 - 22, 2024",
        //     location: "London, UK"
        // },
        // {
        //     id:3,
        //     poster: "https://via.placeholder.com/150",
        //     name: "Electric Castle",
        //     dates: "July 17 - 20",
        //     location: "Cluj, Romania"
        // }
        // Commenting out as it was a placeholder.
    // ];

    const [festivals, setFestivals] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // state to handle search input

    useEffect (() => {
        const getFestivals = async () => {
            const fetchedFestivals = await fetchFestivals();
            console.log(fetchedFestivals);
            setFestivals(fetchedFestivals);
        };

        getFestivals();
    }, []);

    // Filter festivals based on search query
    const filteredFestivals = festivals.filter(festival => 
        festival.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        festival._embedded?.venues[0]?.city.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (

        <>
            <MenuNavbar />
            <div className="festivals-page">
                <Container fluid="md">
                    <h1 className="my-4">Where will you dance next?</h1>

                    {/* Search Bar */}
                    <Form.Group controlId="search">
                        <Form.Control
                            type="text"
                            placeholder="Search festivals by name or location"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </Form.Group>

                    <Row className="mt-4 justify-content-center">
                        {filteredFestivals.length > 0 ? (
                            filteredFestivals.map(festival => (
                            <Col key={festival.id} sm={12} md={6} lg={3} className="mb-4 d-flex">
                                <FestivalCard
                                    poster={festival.images[0]?.url}
                                    name={festival.name}
                                    dates={festival.dates.start.localDate}
                                    location={festival._embedded.venues[0]?.city.name || "Unknown"}
                                />
                            </Col>
                          ))
                        ) : (
                            <p>No festivals found for your search</p>
                        )}
                    </Row>
                </Container>
            </div>
        </>
    );
}


export default Festivals;
