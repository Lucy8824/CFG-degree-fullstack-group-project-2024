import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function FestivalDetailsPage() {
    const { id } = useParams(); //Extract festival ID from the URL params
    const [festival, setFestival] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!id) {
            setError("Festival ID is missing");
            return;
        }

        //Fetch the festival data by ID
        const fetchFestivalById = async () => {
            try {
                const response = await fetch(`http://localhost:3006/api/festival/${id}`);
                console.log('API Response:', response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Checking if the response is in JSON format
                // const contentType = response.headers.get("content-type");
                // if (!contentType || !contentType.includes("application/json")) {
                //     throw new Error("Received non-JSON response from the server");
                // }

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
                <Col>
                    <h1>{festival.name}</h1>
                    <p>Date: {festival.dates.start.localDate}</p>
                    <p>Location: {festival._embedded.venues[0]?.city.name}</p>
                </Col>
            </Row>
        </Container>
    );
}

export default FestivalDetailsPage;