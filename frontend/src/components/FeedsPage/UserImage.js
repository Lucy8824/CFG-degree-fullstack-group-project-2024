import React from "react";

const UserImage = (image, name, style) => {
    return ( 
    <img src={image} alt={name} style={style}/>
    )
}

export default UserImage; 