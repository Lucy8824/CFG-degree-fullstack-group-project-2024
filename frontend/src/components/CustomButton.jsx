import React from "react";
import "./CustomButton.css";

const CustomButton = (props) => {

const handleClick = () => {
    console.log("It works")
}

return (
    <button className={`button-click ${props.forgotPassword} ${props.signUp}`} onClick={handleClick}> {props.buttonText}</button>
)
};

export default CustomButton; 
