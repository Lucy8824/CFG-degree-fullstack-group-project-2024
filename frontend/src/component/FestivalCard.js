import React from "react";
import { Card, Button } from "react-bootstrap";
import "./FestivalCard.css";

const FestivalCard = ({ poster, name, dates, location }) => {
    return (
        <Card className="festival-card h-100">
            <Card.Img variant="top" src={poster} alt="Festival Poster" />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{name}</Card.Title>
                <Card.Text className="flex-grow-1">
                    <strong>Dates:</strong> {dates} <br/>
                    <strong>Location:</strong> {location}
                </Card.Text>
                <Button variant="primary" className="mt-auto">
                    Join Festival Group
                </Button>
            </Card.Body>
        </Card>
    );
}

export default FestivalCard;