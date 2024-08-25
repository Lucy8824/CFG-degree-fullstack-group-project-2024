import React from "react";
import ProfileView from "./ProfileView";
import "./Profile.css"

const ProfileInfo = ({ isEditing, profile, handleInputChange }) => (
    <div className="profile-info">
      {isEditing ? (
        <>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={profile.fullName}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={profile.age}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={profile.location}
            onChange={handleInputChange}
          />
          <textarea
            name="about_me"
            placeholder="About Me"
            value={profile.about_me}
            onChange={handleInputChange}
          />
        </>
      ) : (
        <div>
        <ProfileView 
        name={profile.first_name} 
        age={profile.age} 
        location={profile.location} 
        aboutme={profile.about_me}
        image={profile.profile_picture_url}/>
        
  </div>
      )}
    </div>
  );

  export default ProfileInfo;