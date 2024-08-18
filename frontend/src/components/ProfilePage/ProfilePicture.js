import React, { useState, useEffect } from "react";

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
            <img
                src={file || "https://cdn.vectorstock.com/i/500p/82/33/person-gray-photo-placeholder-woman-vector-24138233.avif"} // Display a default image if none is uploaded
                alt="Profile"
                style={{
                    height: 300,
                    width: 300,
                }}
            />
            <br />
            {isEditing && ( // Only show upload button when in editing mode
                <input type="file" onChange={handleChange} />
            )}
        </div>
    );
}

export default ProfilePicture;
