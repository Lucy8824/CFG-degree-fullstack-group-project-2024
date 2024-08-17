import React from "react";

const ProfileView = ({ name, age, location, aboutme }) => {
    console.log("ProfileView data:",  name, age, location, aboutme );
    return (
        <div>
            <h1>Profile</h1>
            <h2>
                <span>{name},</span>
               <span>{age}</span>
            </h2>
            <h3>{location}</h3>
            <h2>About Me</h2>
            <p>{aboutme}</p>
        </div>
    );
};

export default ProfileView;