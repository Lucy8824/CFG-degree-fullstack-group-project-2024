import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import CustomButton from "../CustomButton.js";
import AuthProvider from "../AuthProvider.js";
import { useAuth } from "../AuthProvider.js";
import ModalForgotPassword from "./ModalForgotPassword";
import ModalResetPassword from "./ModalResetPassword";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  const handleSignupClick = () => {
    console.log("sign up is clicked");
    navigate("/SignUp");
  };

  const handleLoginClick = async (event) => {
    console.log("login is clicked");
    event.preventDefault();
    try {
      const response = await fetch("/user/generateToken", {
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
      const { userID } = data;

      if (token) {
        login(token);
        console.log("Navigating to Profile...");
        navigate(`/Profile/${userID}`); // redirect to protected route
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPasswordClick = () => {
    console.log("forgot password is clicked");
    setShowForgotPasswordModal(true);
  };

  const handleResetPasswordClick = () => {
    console.log("reset password is clicked");
    setShowResetPasswordModal(true);
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
      <form className="form" onSubmit={handleSubmit}>
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
            type="submit"
            onClick={handleSignupClick}
            className="customButtonSignUp"
            buttonText=""
          />
        </div>
      </form>
      <div className="modal-password-forgotten">
        <ModalForgotPassword
          show={showForgotPasswordModal}
          onHide={() => setShowForgotPasswordModal(false)}
        />
      </div>
      <div className="modal-password-reset">
        <ModalResetPassword
          show={showResetPasswordModal}
          onHide={() => setShowResetPasswordModal(false)}
        />
      </div>
    </div>
  );
};
export default LoginPage;
