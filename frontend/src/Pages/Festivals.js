import React, { useState, useEffect } from "react";
import FestivalCard from "../component/FestivalCard";
import { Container, Row, Col } from "react-bootstrap";
import "../App.css";

function Festivals() {

    const festivals = [
        {
            id:1,
            poster: "https://via.placeholder.com/150",
            name: "Summer Beats Festival",
            dates: "June 15 -17, 2024",
            location: "Los Angeles, CA"
        },
        {
            id:2, 
            poster: "https://via.placeholder.com/150",
            name: "Rock the City",
            dates: "July 20 - 22, 2024",
            location: "London, UK"
        },
        {
            id:3,
            poster: "https://via.placeholder.com/150",
            name: "Electric Castle",
            dates: "July 17 - 20",
            location: "Cluj, Romania"
        }
    ];

    return (
        <div className="festivals-page">
            <Container>
                <h1 className="my-4">Where will you dance next?</h1>
                <p>Here you can find all the upcoming festivals!!</p>
                <Row>
                    {festivals.map(festival => (
                        <Col key={festival.id} sm={12} md={6} lg={4}>
                            <FestivalCard
                                poster={festival.poster}
                                name={festival.name}
                                dates={festival.dates}
                                location={festival.location}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}


export default Festivals;
