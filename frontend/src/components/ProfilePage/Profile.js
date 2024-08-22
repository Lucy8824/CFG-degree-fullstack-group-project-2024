import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ProfileArray from "./ProfileArray.js";
import CustomButton from "../CustomButton.js";
import ProfileInfo from "./ProfileInfo.js";
import ProfilePicture from "./ProfilePicture.js";
import "./Profile.css";



const Profile = ({userId}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    const userId = 2; 
    try {
      const response = await fetch(`http://localhost:3006/getProfile/${userId}`);
      console.log(response);
      if (!response.ok) {
        throw new Error('Profile not found');
      }

      const data = await response.json();  // Parse the JSON data from the response
      console.log(data);
      setProfile(data);  // Set the profile data into state
    } catch (error) {
      setError(error.message);  // Set any error messages
    }
  };

  useEffect(() => {
    fetchProfile(); 
  }, [userId]);  // The dependency array ensures the fetch is triggered when the userId changes

  if (error) {
    return <div>{error}</div>; 
  }

  if (!profile) {
    return <div>Loading...</div>;  // Display a loading message while data is being fetched
  }


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
          <ProfilePicture 
          isEditing={isEditing} 
          image={profile.profile_picture_url}
          />

          <ProfileInfo
            isEditing={isEditing}
            profile={profile}
            handleInputChange={handleInputChange}
          />

          <div className="flexThree">
          <div className="flexOne">
          <div class="card mr-6">
          <ProfileArray
            title="Favourite Artists"
            items={profile.favourite_artists}
            onItemsChange={(newItems) => handleArrayChange('favourite_artists', newItems)}
            isEditing={isEditing}
          />
          </div>
          </div>

          <div className="flexOne">
          <div class="card ml-8">
          <ProfileArray
            title="Festivals to attend"
            items={profile.plan_to_visit}
            onItemsChange={(newItems) => handleArrayChange('festivals_want', newItems)}
            isEditing={isEditing}
          />
          </div>
          </div>
          

          <div className="flexOne">
          <div class="card mt-3">
          <ProfileArray
            title="Festivals attended"
            items={profile.attended_festivals}
            onItemsChange={(newItems) => handleArrayChange('festivals_attended', newItems)}
            isEditing={isEditing}
          />
          </div>
          </div>
          </div>

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
