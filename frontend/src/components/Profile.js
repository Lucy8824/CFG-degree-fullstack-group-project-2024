import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ProfileView from "./ProfileView.js";
import ProfileArray from "./ProfileArray.js";

const Profile = () => {
  //   const navigate = useNavigate();
  //   // handleProfileClick might need taking out but not sure how to because the use navigate part of the function works
  //   const handleProfileClick = () => {
  //     console.log("profile info is displayed");
  //     navigate("/Profile");
  //   };

  // if setProfile isn't being used maybe we can take that out too
  const [profile] = useState({
    fullName: "Natalie Jones",
    location: "New York, NY",
    age: "25",
    about_me:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    favourite_artists: ["Beyonce", "Taylor Swift", "Eminem"],
    festivals_want: ["Download", "Boardmasters", "Reading"],
    festivals_attended: ["Coachella", "Burningman", "Glastonbury"],
  });

  return (
    <div>
      {profile && 
    // added these bits of code with map to make them appear as a list which apparently does someting to rendering the array
    <>
  
    <ProfileView fullName={profile.fullName} 
    age={profile.age} 
    location={profile.location} 
    about_me={profile.about_me}/>
  
    <ProfileArray 
    title="Favourite Artists"
    items={profile.favourite_artists}
    />
    
    <ProfileArray 
    title="Festivals to attend"
    items={profile.festivals_want}/>
    
    <ProfileArray 
    title="Festivals attended"
    items={profile.festivals_attended}
    />
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
    </>
    }
    </div>
  );
};

export default Profile;
