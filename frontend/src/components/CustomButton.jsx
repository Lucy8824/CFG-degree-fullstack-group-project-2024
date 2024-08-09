import React from "react";
import "./CustomButton.css";

const CustomButton = (props) => {

return (
    <button className={`button-click ${props.forgotPassword} ${props.signUp}`} onClick={props.onClick}> {props.buttonText}</button>
)
};

export default CustomButton; 
