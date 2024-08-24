import React, { useState, useEffect } from "react";
import "./Profile.css";

function ProfilePicture({ isEditing, image }) { // Receive isEditing as a prop
    const [file, setFile] = useState(image);
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
 
    useEffect(() => {
        // Update file if image prop changes
        setFile(image);
    }, [image]);

    return (
    <div className="profilePicture">
        <div className="main-body">
        <h1>Profile</h1>
            <div className="flexOne">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="align-items-center text-center"></div>
                                   <img
                                   src={file || "https://img.freepik.com/premium-photo/beautiful-woman-enjoying-summer-music-festival-beach_855607-509.jpg?w=1060"} // Display a default image if none is uploaded
                                    alt="Profile"
                                    className="profile-img" // To apply the CSS class
            />
            <br />
            {isEditing && ( // Only show upload button when in editing mode
                <input type="file" onChange={handleChange} />
            )}
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
        </div>
    );
}

export default ProfilePicture;
