import React from "react";
import ProfileView from "./ProfileView";

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
        <ProfileView
          fullName={profile.fullName}
          age={profile.age}
          location={profile.location}
          about_me={profile.about_me}
        />
      )}
    </div>
  );

  export default ProfileInfo;