import React from "react";

const ProfileView = ({fullName, age, location, about_me}) => {

    return (
        <div>
            <h1>Profile</h1>
            <h2>
            <span>{fullName},</span>
            {age}
            </h2>
            <h3>{location}</h3>
            <h2>About Me</h2>
             <p>{about_me}</p>
        </div>
    )
}

export default ProfileView;