import React, { useState } from "react";

function ProfilePicture({ isEditing }) { // Receive isEditing as a prop
    const [file, setFile] = useState(null);

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
 
    return (
        <div className="profilePicture">
            <img
                src={file || "https://cdn.vectorstock.com/i/500p/82/33/person-gray-photo-placeholder-woman-vector-24138233.avif"} // Display a default image if none is uploaded
                alt="Profile"
                style={{
                    height: 250,
                    width: 250,
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
