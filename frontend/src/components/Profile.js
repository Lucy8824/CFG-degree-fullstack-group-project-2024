import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ProfileView from "./ProfileView.js";
import ProfileArray from "./ProfileArray.js";
import mockdata from "./mockdata.js";
import CustomButton from "./CustomButton.js";

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
                type="text"
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

          {/* Edit and Save Buttons */}
          {isEditing ? (
            <CustomButton
              type="button"
              onClick={handleSaveClick}
              buttonText="Save Changes"
            />
          ) : (
            <CustomButton
              type="button"
              onClick={handleEditClick}
              buttonText="Edit Page"
            />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;

      {/* // below is the code to add multiple links to access other pages without
      refreshing the browser */}
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/SignUp">Signup</Link>
          </li>
          <li>
            <Link to="/ForgotPassword">Forgot Password</Link>
          </li>
        </ul>
      </nav> */}
      