import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton.js";

const SignUp = () => {
  const navigate = useNavigate();
  const handleProfileClick = () => {
    console.log("Sign up is working");
    navigate("/Profile");
  };

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

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
              placeholder="full name"
            />
          </div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="email"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            placeholder="password"
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
