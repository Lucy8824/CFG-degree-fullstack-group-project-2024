import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import './FestivalDetailsPage.css';
import NavBar from '../components/NavBar/NavBar';

function FestivalDetailsPage() {
    const { id } = useParams(); //Extract festival ID from the URL params#
    const [festival, setFestival] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        // if (!id) {
        //     setError("Festival ID is missing");
        //     return;
        // }

        //Fetch the festival data by ID
        const fetchFestivalById = async () => {
            try {
                const response = await fetch(`http://localhost:3006/api/festival/${id}`);
                console.log('API Response:', response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Festival Data:', data);
                setFestival(data);
            } catch (error) {
                console.error('Error fetching festival details:', error);
                setError(error.message);
            }
        };
        fetchFestivalById();
    }, [id]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!festival) {
        return <p>Loading...</p>;
    }

    const bannerImage = 'https://images.unsplash.com/photo-1672841821756-fc04525771c2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fG11c2ljJTIwZmVzdGl2YWx8ZW58MHwwfDB8fHwy';

    return (
        <>
        <NavBar />
        <div className="festival-details-page">
                <div className="banner-page" style={{ backgroundImage: `url(${bannerImage})` }}>
                    <div className="banner-content">
                        <h1>{festival.name}</h1>
                        <p>{festival.dates}</p>
                        <p>{festival.location}</p>
                    </div>
                </div>
            <Container className="mt-4">
                <Row>
                    <Col md={6}>
                        <div className="section-header">
                            <h2>Event Information</h2>
                        </div>
                        <div className="event-info">
                            {festival.website && (
                                <Button
                                    href={festival.website}
                                    target="_blank"
                                    variant="primary"
                                
                                >
                                    Event Website
                                </Button>
                            )}
                            {festival.tickets && (
                                <Button className="button"
                                    href={festival.tickets}
                                    target="_blank"
                                    variant="primary"
                                    
                                >
                                    Buy Tickets
                                </Button>
                            )}
                            <p><strong>Venue: </strong>{festival.location}</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="section-header">
                            <h2>Lineup</h2>
                           </div>
                           <div className="lineup">
                                <Row>
                                    <Col xs={6}>
                                        <ListGroup variant="flush">
                                            {festival.lineup.slice(0, Math.ceil(festival.lineup.length /2)).map((artist, index) => (
                                                <ListGroup.Item key={index}>{artist}</ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Col>  
                                    <Col xs={6}>
                                        <ListGroup variant="flush">
                                            {festival.lineup.slice(Math.ceil(festival.lineup.length /2)).map((artist, index) => (
                                                <ListGroup.Item key={index}>{artist}</ListGroup.Item>
                                            ))}
                                        </ListGroup>   
                                    </Col>  
                                </Row> 
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </>

    );
}

export default FestivalDetailsPage;