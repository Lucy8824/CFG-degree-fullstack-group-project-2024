import React from "react";
import "./Profile.css";

const ProfileView = ({ name, age, location, aboutme }) => {
    console.log("ProfileView data:",  name, age, location, aboutme );
    return (
        <div className="main-body">
         <div className="flexThree">
            <div className="flexOne">
              <div className="card">
                <div class="card-body">
                    <h2>
                    <span>{name},</span>
                    <span>{age}</span>
                    </h2>
                    <h3>{location}</h3>
                 </div>
                </div>
             </div>
             <div className="flexTwo">
              <div class="card mb-3">
                <div class="card-body">
                    <h2>About Me</h2>
                    <p>{aboutme}</p>
                </div>
            </div>
        </div>
    </div>
</div>
    );
};

export default ProfileView;