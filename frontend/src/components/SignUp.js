import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton.js";

// only want to navigate to profile from here so useNavigate is better
const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("The form is working");
    // fetch data from the backend
    try {
      const response = await fetch("http://localhost:3006/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setMessage("Signup successful!");
        //redirect to profile page after successful sign up
        navigate("/Profile");
      } else {
        const errorData = await response.json();
        setMessage("Signup failed: ${errorData.message}");
      }
    } catch (error) {
      setMessage("An error occured.");
      console.error("Error:", error);
    }
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
        <CustomButton type="submit" buttonText="Sign up" />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;
