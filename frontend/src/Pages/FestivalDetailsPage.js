import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
// import '../Pages/FestivalDetailsPage.css';

function FestivalDetailsPage() {
    const { id } = useParams(); //Extract festival ID from the URL params
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

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>{festival.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Date: {festival.dates}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Location: {festival.location}</Card.Subtitle>
                            <Card.Text>{festival.description}</Card.Text>
                            {festival.website && (
                                <Card.Link href={festival.website} target="_blank">Event Website</Card.Link>
                            )}
                            {festival.tickets && (
                                <Card.Link href={festival.tickets} target="_blank">Buy Tickets</Card.Link>
                            )}
                        </Card.Body>
                    </Card>
                    {festival.lineup.length > 0 && (
                        <Card>
                            <Card.Header>Lineup</Card.Header>
                            <ListGroup variant="flush">
                                {festival.lineup.map((artist, index) => (
                                    <ListGroup.Item key={index}>{artist}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default FestivalDetailsPage;