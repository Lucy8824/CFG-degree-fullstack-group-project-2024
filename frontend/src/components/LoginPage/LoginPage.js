import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import CustomButton from "../CustomButton.js";
import AuthProvider from "../AuthProvider.js";
import { useAuth } from "../AuthProvider.js";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignupClick = () => {
    console.log("sign up is clicked");
    navigate("/SignUp");
  };

  const handleLoginClick = async (event) => {
    console.log("login is clicked");
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3006/user/generateToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      const token = data.token;

      if (token) {
        login(token);
        console.log("Navigating to Profile...");
        navigate("/Profile/:user_id"); // redirect to protected route
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPasswordClick = () => {
    console.log("forgot password is clicked");
    navigate("/ForgotPassword");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // authentication here
    console.log("Email:", email);
    console.log("Password:", password);
  };
  return (
    <div className="loginContainer">
      <h1 className="title">Welcome to your Festival Meetup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="emailBox"
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
            className="passwordBox"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            placeholder="Password"
          />
        </div>
        <div className="inputContainer">
          <CustomButton
            type="submit"
            onClick={handleLoginClick}
            buttonText="Login"
            className="customButtonLogin"
          />
          <CustomButton
            type="forgotPassword"
            onClick={handleForgotPasswordClick}
            buttonText="Forgot password?"
            className="customButtonForgotPassword"
          />
          <CustomButton
            type="submit"
            onClick={handleSignupClick}
            buttonText="Don't have an account? Sign up"
            className="customButtonSignUp"
          />
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
