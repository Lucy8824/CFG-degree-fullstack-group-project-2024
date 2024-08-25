import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./FestivalCard.css";

const FestivalCard = ({ poster, name, dates, location, link }) => {
    return (
        <Link to={link} className="festival-card-link">
            <div className="festival-card">
                <img src={poster} alt="Festival Poster" className="festival-poster" />
                <div className="festival-info">
                    <p className="festival-title">{name}</p>
                    <p className="festival-dates">Dates: {dates}</p>
                    <p className="festival-location">Location: {location}</p>
                </div>
            </div>
        </Link>
    );
}

export default FestivalCard;