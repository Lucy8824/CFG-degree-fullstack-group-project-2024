import React from "react";
import { Card, Button } from "react-bootstrap";

const FestivalCard = ({ poster, name, dates, location }) => {
    return (
        <Card style={{ width: '18rem', marginBottom: '20 px' }}>
            <Card.Img variant="top" src={poster} alt="Festival Poster" />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    <strong>Dates:</strong> {dates} <br/>
                    <strong>Location:</strong> {location}
                </Card.Text>
                <Button variant="primary">Join Festival Group</Button>
            </Card.Body>
        </Card>
    );
}

export default FestivalCard;