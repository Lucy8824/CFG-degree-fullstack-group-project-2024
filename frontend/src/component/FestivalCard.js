import React from "react";
import { Card, Button } from "react-bootstrap";
import "./FestivalCard.css";

const FestivalCard = ({ poster, name, dates, location }) => {
    return (
        <Card className="festival-card" bg="dark" text="light">
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