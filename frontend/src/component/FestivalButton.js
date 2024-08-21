import React from "react";
import { useNavigate } from "react-router-dom";

const FestivalButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/festivals");
    };
    
    return (
        <button onClick={handleClick}>Search Festivals</button>
    );
};

export default FestivalButton;