import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton.js";

// only want to navigate to profile from here so useNavigate is better
const SignUp = () => {
  const navigate = useNavigate();
  const handleProfileClick = () => {
    console.log("Sign up is working");
    navigate("/Profile");
  };

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("it's working");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              type="fullName"
              id="fullName"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              placeholder="Full name"
            />
          </div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            placeholder="Password"
          />
        </div>

        <div>
          <input
            type="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            placeholder="Confirm password"
          />
        </div>
      </form>
      <CustomButton
        type="signup"
        onClick={handleProfileClick}
        buttonText="Sign up"
      />
    </div>
  );
};

export default SignUp;
