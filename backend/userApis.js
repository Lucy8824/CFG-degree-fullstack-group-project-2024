const pool = require(`./pool`);

/// update userProfile endpoint
app.put('/updateProfile/:id', (req, res) => {
    const profileID = req.params.id; //the profile ID being edited
    const userid = req.params.id; //the logged-in user ID extracted from the JWT

// this will ensure the logged-in user is only editing their own profile
if (userid !== profileID) {
    return res.status(403).send("You are not able to edit this profile")
}

    const {first_name, age, location, about_me, favourite_artists, attended_festivals, plan_to_visit} = req.body;

const updateQuery = `
UPDATE user_profile 
SET 
first_name = ?,
age = ?,
location = ?,
about_me = ?,
favourite_artists = ?,
plan_to_visit = ?,
attended_festivals = ?
WHERE user_id =?`

pool.query(
    updateQuery,
    [first_name, age, location, about_me, JSON.stringify(favourite_artists), JSON.stringify(plan_to_visit), JSON.stringify(attended_festivals), user_Id],
 (err, result) => {
    if (err) {
        console.log(err);
        res.status(500).send("Error updating profile");
    } else {
        // check if the user was found and updated
        if (results.affectedRows === 0) {
            res.status(404).json({error: "User ID not present"});
        } else {
            res.status(200).json({message : "Profile Updated"});
        }
    }
 }
);
});


