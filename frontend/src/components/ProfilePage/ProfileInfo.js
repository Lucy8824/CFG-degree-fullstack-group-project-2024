import React from "react";
import ProfileView from "./ProfileView";
import "./Profile.css"

const ProfileInfo = ({ isEditing, profile, handleInputChange }) => (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleInputChange}
          />
          <textarea
            name="about_me"
            value={profile.about_me}
            onChange={handleInputChange}
          />
        </>
      ) : (
        <div>
        <ProfileView name={profile.first_name} age={profile.age} location={profile.location} aboutme={profile.about_me}/>
  </div>
      )}
    </div>
  );

  export default ProfileInfo;