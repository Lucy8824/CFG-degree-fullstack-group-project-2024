import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ProfileView from "./ProfileView.js";
import ProfileArray from "./ProfileArray.js";
import mockdata from "./mockdata.js";


const Profile = () => {
  //   const navigate = useNavigate();
  //   // handleProfileClick might need taking out but not sure how to because the use navigate part of the function works
  //   const handleProfileClick = () => {
  //     console.log("profile info is displayed");
  //     navigate("/Profile");
  //   };

  // if setProfile isn't being used maybe we can take that out too
  const [profile] = useState(mockdata);

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
      <button>Edit page</button>
    </>
    }
    </div>
  );
};

export default Profile;
