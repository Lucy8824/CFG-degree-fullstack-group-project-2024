import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton.js";
import './SignUp.css';

// only want to navigate to profile from here so useNavigate is better
const SignUp = () => {
  const navigate = useNavigate();
  console.log("Sign up is working");

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("it's working");

    // check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ fullName, email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("Registration successful", data);

      // Navigate to profile or login page on success
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.message);
    }
  };

  return (
    <div className="container-signup">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <input
              type="fullName"
              id="fullName"
              className="input-field"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              placeholder="Full name"
            />
          </div>
          <div className="form-group">
          <input
            type="email"
            id="email"
            className="input-field"
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
            className="input-field"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            placeholder="Password"
          />
        </div>

        <div className="form-group">
          <input
            type="confirmPassword"
            id="confirmPassword"
            className="input-field"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            placeholder="Confirm password"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <CustomButton className="custom-button" type="submit" onClick={() => {}} buttonText="Sign up" />
      </form>
    </div>
  );
};

export default SignUp;
