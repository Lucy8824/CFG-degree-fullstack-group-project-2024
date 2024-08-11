import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

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
    // added these bits of code with map to make them appear as a list which apparently does someting to rendering the array
    <>
      <h1>Profile</h1>
      <h2>
        <span>{profile.fullName},</span>
        {profile.age}
      </h2>
      <h3>{profile.location}</h3>
      <h2>About Me</h2>
      <p>{profile.about_me}</p>
      <h2>Favourite Artists</h2>
      <ul>
        {profile.favourite_artists.map((artist, index) => (
          <li key={index}>{artist}</li>
        ))}
      </ul>
      <h2>Festivals to attend</h2>
      <ul>
        {profile.festivals_want.map((festival, index) => (
          <li key={index}>{festival}</li>
        ))}
      </ul>
      <h2>Festivals Attended</h2>
      <ul>
        {profile.festivals_attended.map((festival, index) => (
          <li key={index}>{festival}</li>
        ))}
      </ul>
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
  );
};

export default Profile;
