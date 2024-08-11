import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import CustomButton from "./CustomButton.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleSignupClick = () => {
    console.log("sign up is clicked");
    navigate("/SignUp");
  };

  const handleLoginClick = () => {
    console.log("login is clicked");
    navigate("/Profile");
  };

  const handleForgotPasswordClick = () => {
    console.log("forgot password is clicked");
    navigate("/ForgotPassword");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // authentication here
    console.log("Email:", email);
    console.log("Password:", password);
  };
  return (
    <div className="container">
      <h1 className="title">Welcome to your Festival Meetup</h1>
      <form onSubmit={handleSubmit}>
        <div>
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
      </form>

      <CustomButton
        type="submit"
        onClick={handleLoginClick}
        buttonText="Login"
      />
      <CustomButton
        type="forgotPassword"
        onClick={handleForgotPasswordClick}
        buttonText="Forgotten your password?"
      />
      <CustomButton
        type="submit"
        onClick={handleSignupClick}
        buttonText="Don't have an account? Sign up"
      />
    </div>
  );
};
export default LoginPage;
