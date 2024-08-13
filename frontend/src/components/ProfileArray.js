import React from "react";

const ProfileArray = ({ items, title }) => {
    return (
        <div>
            <h2>{title}</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProfileArray;