import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ProfileArray from "./ProfileArray.js";
import CustomButton from "../CustomButton.js";
import ProfileInfo from "./ProfileInfo.js";
import ProfilePicture from "./ProfilePicture.js";

const Profile = ({ userId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`http://localhost:3006/getProfile`);
      console.log(response);
      if (!response.ok) {
        throw new Error("Profile not found");
      }

      const data = await response.json(); // Parse the JSON data from the response
      console.log(data);
      setProfile(data); // Set the profile data into state
    } catch (error) {
      setError(error.message); // Set any error messages
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]); // The dependency array ensures the fetch is triggered when the userId changes

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>; // Display a loading message while data is being fetched
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

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:3006/updateProfile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...profile,
            favourite_artists: profile.favourite_artists,
            attended_festivals: profile.attended_festivals,
            plan_to_visit: profile.plan_to_visit,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const result = await response.json();
      console.log("Update result:", result);
      setIsEditing(false); // Exit editing mode after successful update
    } catch (error) {
      console.error("Error saving profile:", error);
      setError(error.message);
    }
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
            image={profile.profile_picture_url}
          />

          <ProfileArray
            title="Favourite Artists"
            items={profile.favourite_artists}
            onItemsChange={(newItems) =>
              handleArrayChange("favourite_artists", newItems)
            }
            isEditing={isEditing}
          />

          <ProfileArray
            title="Festivals to attend"
            items={profile.plan_to_visit}
            onItemsChange={(newItems) =>
              handleArrayChange("plan_to_visit", newItems)
            }
            isEditing={isEditing}
          />

          <ProfileArray
            title="Festivals attended"
            items={profile.attended_festivals}
            onItemsChange={(newItems) =>
              handleArrayChange("attended_festivals", newItems)
            }
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
