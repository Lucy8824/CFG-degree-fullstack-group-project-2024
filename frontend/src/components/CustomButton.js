import React from "react";
import "./CustomButton.css";

const CustomButton = (props) => {
  const buttonClassName = `button-click ${props.className || ""}`;

  return (
    <button className={buttonClassName} onClick={props.onClick}>
      {props.buttonText}
    </button>
  );
};

export default CustomButton;
