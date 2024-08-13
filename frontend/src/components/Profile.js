import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ProfileArray from "./ProfileArray.js";
import mockdata from "./mockdata.js";
import CustomButton from "./CustomButton.js";
import ProfileInfo from "./ProfileInfo.js";
import ProfilePicture from "./ProfilePicture.js";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockdata);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log('Profile saved:', profile);
    // Implement API call or other save logic here
  };

  const handleArrayChange = (key, newItems) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [key]: newItems,
    }));
  };

  return (
    <div>
      {profile && (
        <>
          <ProfileInfo
            isEditing={isEditing}
            profile={profile}
            handleInputChange={handleInputChange}
          />
          <ProfilePicture 
          isEditing={isEditing} 
          />

          <ProfileArray
            title="Favourite Artists"
            items={profile.favourite_artists}
            onItemsChange={(newItems) => handleArrayChange('favourite_artists', newItems)}
            isEditing={isEditing}
          />

          <ProfileArray
            title="Festivals to attend"
            items={profile.festivals_want}
            onItemsChange={(newItems) => handleArrayChange('festivals_want', newItems)}
            isEditing={isEditing}
          />

          <ProfileArray
            title="Festivals attended"
            items={profile.festivals_attended}
            onItemsChange={(newItems) => handleArrayChange('festivals_attended', newItems)}
            isEditing={isEditing}
          />

          <CustomButton
            type="button"
            onClick={isEditing ? handleSaveClick : handleEditClick}
            buttonText={isEditing ? "Save Changes" : "Edit Page"}
          />
        </>
      )}
    </div>
  );
};

export default Profile;
